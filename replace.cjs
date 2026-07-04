const fs = require('fs');
const files = [
  'public/sitemap.xml',
  'public/robots.txt',
  'public/sitemap.json',
  'src/components/Seo.tsx',
  'src/components/Layout.tsx',
  'TASKS.md',
  'index.html',
  'src/pages/MiscPages.tsx',
  'src/pages/About.tsx',
  'metadata.json',
  'README.md'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/ruralutilitycost\.com/gi, match => {
        if (match === 'ruralutilitycost.com') return 'ruralopstools.com';
        if (match === 'RuralUtilityCost.com') return 'RuralOpsTools.com';
        return 'ruralopstools.com'; // fallback
    });
    content = content.replace(/Rural Utility Cost/g, 'Rural Ops Tools');
    content = content.replace(/rural utility cost/gi, 'rural ops tools');
    content = content.replace(/ruralutilitycost/gi, 'ruralopstools');
    fs.writeFileSync(file, content);
  }
});
