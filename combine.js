const fs = require('fs');
const path = require('path');

// අවසන් ප්‍රතිදාන ෆයිල් එකේ නම
const outputFileName = 'project_codebase.txt';
const outputFilePath = path.join(__dirname, outputFileName);
const projectDir = __dirname;

// කේතයට අදාළ නොවන විශාල ෆෝල්ඩර මඟ හැරීම
const excludeDirs = ['.next', 'node_modules', '.git', 'public', '.vercel'];

// කියවිය යුතු ෆයිල් වර්ග (Extensions)
const allowedExtensions = ['.js', '.jsx', '.json', '.css', '.md', '.env.local'];

// කලින් සෑදූ ෆයිල් එකක් ඇත්නම් එය මකා දැමීම
if (fs.existsSync(outputFilePath)) {
    fs.unlinkSync(outputFilePath);
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (!excludeDirs.includes(file)) {
                processDirectory(fullPath);
            }
        } else {
            const ext = path.extname(file);
            
            // Output file එක සහ package-lock.json මඟ හැරීම
            if (file === outputFileName || file === 'package-lock.json') return;

            if (allowedExtensions.includes(ext) || file === '.env.local') {
                // Windows පරිගණක වල \ ලකුණ / බවට පත් කර නිවැරදි Path එක සෑදීම
                let relativePath = path.relative(projectDir, fullPath);
                relativePath = relativePath.split(path.sep).join('/'); 
                
                const content = fs.readFileSync(fullPath, 'utf8');
                const separator = `\n\n=== FILE: /${relativePath} ===\n\n`;
                
                fs.appendFileSync(outputFilePath, separator + content);
            }
        }
    });
}

console.log('Generating consolidated codebase file...');
processDirectory(projectDir);
console.log(`✅ Success! All necessary files consolidated into: ${outputFileName}`);