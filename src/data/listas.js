export const listLists = {
  'oficinas': 1,
  'museos': 2,
  'penas': 3,
  'compras': 4,
  'festivales': 5,
  'artesano': 6,
  'bodegas': 7,
  'ciclodificultad-a': 8,
  'ciclodificultad-m': 9,
  'ciclodificultad-b': 10
};

export function idListList(){
  var ret = {};
  for(var key in listLists){
    ret[listLists[key]] = key;
  }
  return ret;
}