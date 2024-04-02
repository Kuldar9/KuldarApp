


CODE NOT WORKING, UPDATE SECTIONS FOR REPLACING BETTER!!!



const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const componentsFolder = path.join(__dirname, '../Components');
const UNIVERSAL_LAYOUT_PATH = path.join(__dirname, './UniversalLayout.js');
const COMPONENT_MANAGER_PATH = path.join(__dirname, './ComponentManager.js');

// Function to recursively traverse folders and find component files
const traverseFolders = (folderPath, componentFiles) => {
    const files = fs.readdirSync(folderPath);

    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory() && file !== 'InternalComponents') {
            traverseFolders(filePath, componentFiles); // Recursively traverse folders
        } else if (stats.isFile() && file.endsWith('.js')) {
            componentFiles.push(filePath); // Add .js files to the list
        }
    });
};

// Function to dynamically import components from files
const importComponents = filePaths => {
    return filePaths.map(filePath => {
        const componentName = path.basename(filePath, '.js');
        return componentName;
    });
};

// Main function to update layout files with component names
const updateLayoutFiles = () => {
    const componentFiles = [];
    traverseFolders(componentsFolder, componentFiles);

    if (componentFiles.length === 0) {
        console.log('No components found in the Components folder.');
        return;
    }

    const componentNames = importComponents(componentFiles);
    if (componentNames.length === 0) {
        console.log('No components imported.');
        return;
    }

    // Read current layout file contents
    let universalLayoutContent = fs.readFileSync(UNIVERSAL_LAYOUT_PATH, 'utf8');
    let componentManagerContent = fs.readFileSync(COMPONENT_MANAGER_PATH, 'utf8');

    // Update UniversalLayout.js import section
    const importSectionRegex = /import\s+\{[^}]*\}\s+from\s+'\.\/ComponentManager';/;
    universalLayoutContent = universalLayoutContent.replace(importSectionRegex, () => {
        const imports = componentNames.map(name => `${name},`).join('\n');
        return `import {\n${imports}\n} from '../Components';`;
    });

        // Update ComponentManager.js section 2
    const layoutSettingsSectionRegex = /const\s+\{[^}]*\}\s+=\s+layoutSettings;\s*/;
    componentManagerContent = componentManagerContent.replace(layoutSettingsSectionRegex, () => {
        const layoutSettings = componentNames.map(name => `show${name}Section,`).join('\n');
        return `const {\n${layoutSettings}\n} = layoutSettings;\n`;
    });

    // Update ComponentManager.js section 1
    const adjustedChildrenSectionRegex = /const\s+adjustedChildren\s+=\s+React\.Children\.map\(children,\s+child\s+=>\s+\{[\s\S]*?return\s+child;\s+\}\);/;
    componentManagerContent = componentManagerContent.replace(adjustedChildrenSectionRegex, () => {
        const adjustedChildren = componentNames.map(name => {
            return `if (!show${name}Section && childName === '${name}') {\nreturn null;\n}`;
        }).join('\n');
        return `const adjustedChildren = React.Children.map(children, child => {\n${adjustedChildren}\nreturn child;\n});`;
    });

    // Update ComponentManager.js section 3
    const layoutSettingsRenderSectionRegex = /return\s+<>{[^}]*\};/;
    componentManagerContent = componentManagerContent.replace(layoutSettingsRenderSectionRegex, () => {
        const layoutSettingsRender = componentNames.map(name => {
            return `{layoutSettings.show${name}Section && <${name} />}`;
        }).join('\n');
        return `return <>{\n${layoutSettingsRender}\n};`;
    });

    // Write updated content back to files
    fs.writeFileSync(UNIVERSAL_LAYOUT_PATH, universalLayoutContent);
    fs.writeFileSync(COMPONENT_MANAGER_PATH, componentManagerContent);

    console.log('Layout files updated successfully.');
};

// Watch for changes in the Components folder
const watcher = chokidar.watch(componentsFolder, {
    ignored: /(^|[/\\])\../,  // ignore dotfiles
    persistent: true
});

// Update layout files when changes occur
watcher.on('change', updateLayoutFiles);
watcher.on('add', updateLayoutFiles);

// Handle errors
watcher.on('error', error => console.error(`Watcher error: ${error}`));

// Initial update
updateLayoutFiles();