const firebaseConfig = {
  apiKey: "AIzaSyDarX2f_Ap1SeRTedYhyKnlGlbPWoiIjPU",
  authDomain: "satesto-25969.firebaseapp.com",
  databaseURL: "https://satesto-25969-default-rtdb.firebaseio.com",
  projectId: "satesto-25969",
  storageBucket: "satesto-25969.appspot.com",
  messagingSenderId: "777380839398",
  appId: "1:777380839398:web:78e0a11733b0b7e6372027",
  measurementId: "G-36F3HXJMFF",
};

firebase.initializeApp(firebaseConfig);

function addElementInFirebase(REF, data) {
  firebase.database().ref(`${REF}/${randomID()}`).set(data);
}

function generateFirebaseItem(ID, value) {
  return {
    id: ID,
    data: value,
  };
}

const user = document.querySelector("#userId");
const table = document.querySelector("#tableId");
const order = document.querySelector("#order");

order.addEventListener("click", () => {
  let userID = user.value;
  let tableID = table.value;

  if (userID === "" || tableID == "") {
    displayToast("შეავსეთ ყველა შესავსები ველლი", "error", "red");
  } else {
    displayToast("წარმატებით შესრულდა შეკვეთა", "success", "green");
    addElementInFirebase(userID, {
      name: userID,
      table: tableID,
    });
    order.disabled = true;
  }
});

function getRefFromFirebase(REF) {
  const result = [];
  firebase
    .database()
    .ref(REF)
    .on("value", (response) => {
      response.forEach((element) => {
        result.push(generateFirebaseItem(element.key, element.val()));
      });
    });
  return result;
}

function getElementFromFirebase(REF, id) {
  const array = getRefFromFirebase(REF);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      array.forEach((element) => {
        if (element.id === id) {
          resolve(element);
        }
      });
      reject("404");
    }, 1000);
  });
}

function updateDataInFirebaseByID(REF, id, data) {
  firebase.database().ref(`${REF}/${id}`).set(data);
}

function removeElementFromFirebase(REF, id) {
  firebase.database().ref(`${REF}/${id}`).remove();
}

function removeRefFromFirebase(REF) {
  firebase.database().ref(REF).remove();
}
