const data = {
  name: 'root',
  isFolder: true,
  items: [
    {
      name: 'First',
      isFolder: true,
      items: [
        {
          name: 'nested',
          isFolder: false,
        },
      ],
    },
    { name: 'Sec', isFolder: false },
  ],
};
export default data;
