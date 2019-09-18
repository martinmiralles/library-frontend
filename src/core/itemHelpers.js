export const addItem = (item, next) => {
  let savedItems = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("savedItems")) {
      savedItems = JSON.parse(localStorage.getItem("savedItems"));
    }
    savedItems.push({
      ...item,
      count: 1
    });

    // basically removes the option of duplicates if addding multiple items (probably won't use for this library app)
    savedItems = Array.from(new Set(savedItems.map(book => book._id))).map(
      id => {
        return savedItems.find(book => book._id === id); //an arrow function returning the comparison
      }
    );

    localStorage.setItem("savedItems", JSON.stringify(savedItems));
    next();
  }
};

export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("savedItems")) {
      return JSON.parse(localStorage.getItem("savedItems")).length;
    }
  }
  return 0;
};

export const getSavedItems = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("savedItems")) {
      return JSON.parse(localStorage.getItem("savedItems"));
    }
  }
  return [];
};

export const removeItem = bookId => {
  let savedItems = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("savedItems")) {
      savedItems = JSON.parse(localStorage.getItem("savedItems"));
    }

    savedItems.map((book, i) => {
      if (book._id === bookId) {
        savedItems.splice(i, 1);
      }
    });

    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }
  return savedItems;
};

export const emptySavedItems = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("savedItems");
    next();
  }
};
