/* The fsevents package is required when building on Mac, but will cause npm install to 
 * fail when building on Windows or Linux. This script removes the dependency.
 */
fs = require('fs')
transformJSONFile('package.json', function (package) {
 delete package.devDependencies.fsevents;
});

// tranforms the json in a file and writes contents back to file system
function transformJSONFile(fileName, objectTransformer) {
  // logs if the attempt to write the file was a success
 var logCompletionStatus = function (err) {
   if (err) {
     return console.log(err);
   }
       
   console.log(fileName + ' updated');
 }
  // process the file contents, write it back to the file system
 var transformDataAndWriteResult = function(err, data) {
   if (err) {
     return console.log(err);
   }
   var parsedObject = JSON.parse(data);
   objectTransformer(parsedObject);
       
   fs.writeFile(fileName, JSON.stringify(parsedObject, null, "  "), logCompletionStatus);
 }
  fs.readFile(fileName, 'utf8', transformDataAndWriteResult);
} 