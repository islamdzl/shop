  import Ipackage from '../assets/images/package.png';
  import IDelivery from '../assets/images/delivery.png';
  import ICorrect from '../assets/images/correct.png';
  import ITrue from '../assets/images/true-1.png';
  import ITejecte from '../assets/images/warning-red.png';

export const deleveryTypes = {
  'A': [
    {type: 'path', name: 'Waiting'},
    {type: 'state', name: 'Acceptd', img: ITrue},
    {type: 'path'},
    {type: 'state', name: 'Prepared', img: Ipackage},
    {type: 'path'},
    {type: 'state', name: 'Loaded', img: IDelivery},
    {type: 'path', name: 'Delivery'},
    {type: 'state', name: 'Done', img: ICorrect}
  ],
  'B': [
    {type: 'path', name: 'Waiting'},
    {type: 'state', name: 'Acceptd', img: ITrue},
    {type: 'path', name: 'Delivery'},
    {type: 'state', name: 'Done', img: ICorrect}
  ],
  'E': [
    {type: 'path', name: 'Verify'},
    {type: 'state', name: 'Rejecte', img: ITejecte},
  ]
}

export const parseData = (data)=>{
  if (data.path) {
    return {data: data.path, index: goTo(data.path, data.state)}
  }
  return {data: deleveryTypes[data.type], index: goTo(deleveryTypes[data.type], data.state)}
}

export const goTo = (path, index)=>{
    if (index > path.length) index = path.length;
    return 90 / path.length * index;
}

export default {
  deleveryTypes, parseData, goTo
}