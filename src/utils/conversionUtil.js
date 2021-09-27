export function convertToHierarchicalTreeFormat(data) {
  let hierarchicalData = [];
  let toggleStateMap = {};
  const idMapping = data.reduce((accumulator, element, index) => {
    accumulator[element.id] = index;
    return accumulator;
  }, {});
  data.forEach((element) => {
    if (!element['parent_objective_id']) {
      toggleStateMap[element.id] = true;
      hierarchicalData.push(element);
      return;
    }
    const parentElement = data[idMapping[element['parent_objective_id']]];
    if (parentElement) {
      toggleStateMap[parentElement.id] = true;
      parentElement.children = [...(parentElement.children || []), element];
    }
  });
  return { hierarchicalData, toggleStateMap };
}
