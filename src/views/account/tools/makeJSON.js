var fs = require("fs");
var data = require('./originLocations.json');

var func = (node) => {
  node.value = node.label;
  delete node.level;
}

data.forEach(prov => {
  func(prov);
  prov.children.forEach(city => {
    func(city);
    city.children.forEach(town => {
      func(town);
    })
  });
});

data = JSON.stringify(data);

var writerStream = fs.createWriteStream('output.json');
writerStream.write(data,'UTF8');
writerStream.end();

writerStream.on('finish', function() {
  console.log("写入完成。");
});

writerStream.on('error', function(err){
 console.log(err.stack);
});

console.log("程序执行完毕");