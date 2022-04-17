export function getTreeData(nestedTreeData) {
  return nestedTreeData.map((item) => ({
    ...item,
    hasChildren:
      nestedTreeData.filter((i) => i.parentId === item._id).length > 0,
  }));
}


// const nestedTreeData = [
//   {
//     _id: 1,
//     name: "Bob",
//     text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla optio veritatis vel nobis velit saepe similique illo impedit dicta modi laudantium nam, quae incidunt nemo accusantium. Exercitationem, tempore. Voluptatibus?",
//     image:
//       "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=",
//     date: "17 feb",
//     parentId: 0,
//   },
//   {
//     _id: 2,
//     name: "Alice",
//     text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla optio veritatis vel nobis velit saepe similique illo impedit dicta modi laudantium nam, quae incidunt nemo accusantium. Exercitationem, tempore. Voluptatibus?",
//     image: "https://www.w3schools.com/howto/img_avatar2.png",
//     date: "17 feb",
//     parentId: 1,
//   },
//   {
//     _id: 3,
//     name: "Bob",
//     text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla optio veritatis vel nobis velit saepe similique illo impedit dicta modi laudantium nam, quae incidunt nemo accusantium. Exercitationem, tempore. Voluptatibus?",

//     image:
//       "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=",
//     date: "17 feb",
//     parentId: 2,
//   },
//   {
//     _id: 3,
//     name: "Tom",
//     text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla optio veritatis vel nobis velit saepe similique illo impedit dicta modi laudantium nam, quae incidunt nemo accusantium. Exercitationem, tempore. Voluptatibus?",
//     image:
//       "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
//     date: "17 feb",
//     parentId: 0,
//   },
// ];