const fs = require("fs");
const content = fs.readFileSync(__dirname + '/city.list.json');
const cityList = JSON.parse(content);

export async function city(query: string): Promise<any> {
  return cityList.filter((city) => {
    return city.name.includes(query)
  }).slice(0, 20);
}
