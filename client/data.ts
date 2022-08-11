enum Role {
  superadmin = "superadmin",
  admin = "admin",
  subscriber = "subscriber",
}

const DATA = [
  {
    id: 1,
    firstName: "Saurabh",
    middleName: "",
    lastName: "Singh",
    email: "srv2699@gmail.com",
    phoneNumber: 9548950844,
    role: Role.subscriber,
    address: "Meerut",
  },
  {
    id: 2,
    firstName: "Sahil",
    middleName: "",
    lastName: "Garg",
    email: "garg.sahil@sourcefuse.com",
    phoneNumber: 9843938499,
    role: Role.admin,
    address: "Panipat",
  },
  {
    id: 3,
    firstName: "Vivek",
    middleName: "Singh",
    lastName: "Bisht",
    email: "bisht.vivek@gmail.com",
    phoneNumber: 809090809,
    role: Role.subscriber,
    address: "Mohali",
  },
  {
    id: 4,
    firstName: "Hemdeep",
    middleName: "",
    lastName: "saini",
    email: "saini.hemdeep@gmail.com",
    phoneNumber: 809079809,
    role: Role.superadmin,
    address: "Faridabad",
  },
];

interface User {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  role: string;
  address: string;
}

function FormatDate() {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const dateTime = document.getElementById("dateTime") as HTMLInputElement;
    dateTime.innerHTML = new Date().toLocaleString();
    setInterval(function () {
      dateTime.innerHTML = new Date().toLocaleString();
    }, 1000);
  };
}

var users: any = [];

class CRUD<T> {
  items: Array<T>;

  constructor() {
    this.items = [];
  }

  @FormatDate()
  create(e: T): void {
    this.items.push(e);
  }

  update(i: number, e: T) {
    this.items[i] = e;
    showTable();
  }

  delete(i: number): void {
    this.items.splice(i, 1);
    console.log(this.items);
    showTable();
  }
}

function showTable() {
  var table = document.createElement("table");
  table.className = "table";

  //Header Elements
  let tr = table.insertRow(-1);
  let headerElements = [
    "ID",
    "First Name",
    "Middle Name",
    "Last Name",
    "Email",
    "Phone Number",
    "Role",
    "Address",
  ];

  for (let i = 0; i < headerElements.length; i++) {
    let th = document.createElement("th");
    th.innerHTML = headerElements[i];
    tr.appendChild(th);
  }

  let edit_column = document.createElement("th");
  edit_column.innerHTML = "Edit";
  tr.appendChild(edit_column);
  let delete_column = document.createElement("th");
  delete_column.innerHTML = "Delete";
  tr.appendChild(delete_column);
  let save_column = document.createElement("th");
  save_column.innerHTML = "Save";
  tr.appendChild(save_column);
  let cancel_column = document.createElement("th");
  cancel_column.innerHTML = "Cancel";
  tr.appendChild(cancel_column);

  save_column.style.display = "none";
  save_column.id = "headerSave";
  cancel_column.style.display = "none";
  cancel_column.id = "headerCancel";
  //populating data from json file

  for (let i = 0; i < users.items.length; i++) {
    tr = table.insertRow(-1);
    tr.id = `row${i}`;

    let cell1 = tr.insertCell(-1);
    let id = users.items[i].id;
    cell1.innerHTML = id;
    cell1.id = `row${i}Id`;

    let cell2 = tr.insertCell(-1);
    let fname = users.items[i].firstName;
    cell2.innerHTML = fname;
    cell2.id = `row${i}Fname`;

    let cell3 = tr.insertCell(-1);
    let mname = users.items[i].middleName;
    cell3.innerHTML = mname;
    cell3.id = `row${i}Mname`;

    let cell4 = tr.insertCell(-1);
    let lname = users.items[i].lastName;
    cell4.innerHTML = lname;
    cell4.id = `row${i}Lname`;

    let cell5 = tr.insertCell(-1);
    let email = users.items[i].email;
    cell5.innerHTML = email;
    cell5.id = `row${i}Email`;

    let cell6 = tr.insertCell(-1);
    let phone = users.items[i].phoneNumber;
    cell6.innerHTML = phone;
    cell6.id = `row${i}Phone`;

    let cell7 = tr.insertCell(-1);
    let role = users.items[i].role;
    cell7.innerHTML = role;
    cell7.id = `row${i}Role`;

    let cell8 = tr.insertCell(-1);
    let add = users.items[i].address;
    cell8.innerHTML = add;
    cell8.id = `row${i}Address`;

    cell1.className = "editable";
    cell2.className = "editable";
    cell3.className = "editable";
    cell4.className = "editable";
    cell5.className = "editable";
    cell6.className = "editable";
    cell7.className = "editable";
    cell8.className = "editable";

    //Buttons on each Row

    //EDit button

    let Edit_btn = tr.insertCell(-1);
    let editButton = document.createElement("button");
    editButton.type = "button";
    editButton.innerHTML = "Edit";
    Edit_btn.appendChild(editButton);
    editButton.addEventListener("click", function () {
      editRow(i);
    });

    //Delete

    let Delete_btn = tr.insertCell(-1);
    let deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.innerHTML = "Delete";
    Delete_btn.appendChild(deleteButton);

    deleteButton.addEventListener("mouseenter", layin);
    function layin() {
      deleteButton.style.background = "red";
    }

    deleteButton.addEventListener("mouseleave", layout);
    function layout() {
      deleteButton.style.background = "white";
    }

    deleteButton.addEventListener("click", function () {
      users.delete(i);
    });

    //Save Button

    let Save_btn = tr.insertCell(-1);
    let saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.innerHTML = "Save";
    Save_btn.className = "hiddenElements";
    Save_btn.id = `saveButtonRow${i}`;
    Save_btn.appendChild(saveButton);
    saveButton.addEventListener("click", function () {
      let updatedRowObject = getCurrentRowData(i);
      console.log(updatedRowObject);
      users.update(i, updatedRowObject);

      document.getElementById("saveButtonRow" + i)!.style.display = "none";
      document.getElementById("cancelButtonRow" + i)!.style.display = "none";
      document.getElementById("headerSave")!.style.display = "none";
      document.getElementById("headerCancel")!.style.display = "none";
    });

    //Cancel

    var Cancel_btn = tr.insertCell(-1);
    var cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.innerHTML = "cancel";
    Cancel_btn.className = "hidden";
    Cancel_btn.id = "CancelButtonRow" + i;
    Cancel_btn.appendChild(cancelButton);
    Cancel_btn.style.display = "none";
    cancelButton.addEventListener("click", function () {
      cancelRow(i);
    });
  }

  var divContainer = document.getElementById("showData")!;
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
  let loadButton = <HTMLButtonElement>(
    document.getElementById("showDataButton")!
  );

  loadButton.value = "Refresh";
}

function getCurrentRowData(no: number) {
  let roww = document.getElementById(`row${no}Id`)!.innerHTML;
  let rowId = parseInt(roww);
  let rowFname = document.getElementById("row" + no + "Fname")!.innerHTML;
  let rowMname = document.getElementById("row" + no + "Mname")!.innerHTML;
  let rowLname = document.getElementById("row" + no + "Lname")!.innerHTML;
  let rowEmail = document.getElementById("row" + no + "Email")!.innerHTML;
  let rowP = document.getElementById("row" + no + "Phone")!.innerHTML;
  let rowPhone = parseInt(rowP);
  let rowRole = document.getElementById("row" + no + "Role")!.innerHTML;
  let rowAddress = document.getElementById("row" + no + "Address")!.innerHTML;

  let obj: User = {
    id: rowId,
    firstName: rowFname,
    middleName: rowMname,
    lastName: rowLname,
    email: rowEmail,
    phoneNumber: rowPhone,
    role: rowRole,
    address: rowAddress,
  };

  return obj;
}

function cancelRow(no: number) {
  let row = `row${no}`;
  let currentRow = document.getElementById(row)!;
  currentRow.style.background = "white";

  //Reverting back

  let rowId = document.getElementById("row" + no + "Id")!;
  let rowFname = document.getElementById("row" + no + "Fname")!;
  let rowMname = document.getElementById("row" + no + "Mname")!;
  let rowLname = document.getElementById("row" + no + "Lname")!;
  let rowEmail = document.getElementById("row" + no + "Email")!;
  let rowPhone = document.getElementById("row" + no + "Phone")!;
  let rowRole = document.getElementById("row" + no + "Role")!;
  let rowAddress = document.getElementById("row" + no + "Address")!;

  rowId.innerHTML = users.items[no].id;
  rowFname.innerHTML = users.items[no].firstName;
  rowMname.innerHTML = users.items[no].middleName;
  rowLname.innerHTML = users.items[no].lastName;
  rowEmail.innerHTML = users.items[no].email;
  rowPhone.innerHTML = users.items[no].phoneNumber;
  rowRole.innerHTML = users.items[no].role;
  rowAddress.innerHTML = users.items[no].address;

  //Makes Row ineditable

  currentRow.setAttribute("contenteditable", "false");

  //Hide save and delete columns

  document.getElementById("saveButtonRow" + no)!.style.display = "none";
  document.getElementById("cancelButtonRow" + no)!.style.display = "none";
  document.getElementById("headerSave")!.style.display = "none";
  document.getElementById("headerCancel")!.style.display = "none";
}

function editRow(no: number) {
  let currentRow = document.getElementById(`row${no}`)!;
  currentRow.style.background = "green";

  //MAKE ROW EDITABLE

  currentRow.setAttribute("contenteditable", "true");
}

async function main() {
  users = new CRUD<User>();
  DATA.forEach(function (e: User) {
    users.create(e);
  });
  console.log(users);
  showTable();
}
