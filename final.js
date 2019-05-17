function showEdit() {
    div = document.getElementById('edit-form');
    div.style.display = "block";
};

function hideEdit() {
    div = document.getElementById('edit-form');
    div.style.display = "none";
};

function showAdd() {
    div = document.getElementById('contacts-form');
    div.style.display = "block";
};

function hideAdd() {
    div = document.getElementById('contacts-form');
    div.style.display = "none";
};

function showDetails() {
    
    div = document.getElementById('details');
    div.style.display = "block";
};

function hideDetails() {
    div = document.getElementById('details');
    div.style.display = "none";
    if (detailsDiv.detailName = null) {
         return}
    else {detailsDiv.removeChild(detailName);
        detailsDiv.removeChild(detailEmail);
        detailsDiv.removeChild(detailPhone);
        detailsDiv.removeChild($td);}
};

function hideTable () {
    div = document.getElementById('table');
    div.style.display = "none";
}

function showTable () {
    div = document.getElementById('table');
    div.style.display = "block";
}

function editDetails() {
    var entry = JSON.parse(window.localStorage.getItem("Contacts:"+ event.target.getAttribute("data-id")));
             showEdit();
             hideTable();
        
        Contacts.$editform.name.value = entry.name;
        Contacts.$editform.email.value = entry.email;
        Contacts.$editform.phone.value = entry.phone;
        Contacts.$editform.id_entry.value = entry.id;

}



const detailsDiv = document.getElementById('details')
 
detailsDiv.addEventListener("click", function(event) {
    var op = event.target.getAttribute("data-op");
     if (/edit|details|remove/.test(op)) {
         var entry = JSON.parse(window.localStorage.getItem("Contacts:"+ event.target.getAttribute("data-id")));
         if (op == "edit") {
                  showEdit();
                  hideTable();
                  hideDetails();
             
             Contacts.$editform.name.value = entry.name;
             Contacts.$editform.email.value = entry.email;
             Contacts.$editform.phone.value = entry.phone;
             Contacts.$editform.id_entry.value = entry.id;
         }
         
         else if (op == "remove") {
             if (confirm('Are you sure you want to remove "'+ entry.name+'" from your contacts?')) {
                 Contacts.storeRemove(entry);
                 Contacts.tableRemove(entry);
                 hideDetails();
                 showTable();
             }
         }
         event.preventDefault();
     }
 })


var Contacts = {
    index: window.localStorage.getItem("Contacts:index"),
    $table: document.getElementById("contacts-table"),
    $form: document.getElementById("contacts-form"),
    $button_save: document.getElementById("contacts-op-save"),
    $editform: document.getElementById("edit-form"),

 
    init: function() {
        // initialize storage index
        if (!Contacts.index) {
            window.localStorage.setItem("Contacts:index", Contacts.index = 1);
        }

        // initialize form

        Contacts.$form.addEventListener("submit", function(event) {
            if( document.myForm.name.value == "" ) {
                alert( "Please provide your name" );
                event.preventDefault()
                return;
             }
             if( document.myForm.email.value == "" ) {
                alert( "Please provide your Email" );
                event.preventDefault()
                return;
             }
             if( document.myForm.phone.value == "" ) {
                 alert( "Please provide your Phone Number" );
                 event.preventDefault()
                 return;
             }
             var emailID = document.myForm.email.value;
                atpos = emailID.indexOf("@");
                dotpos = emailID.lastIndexOf(".");
                
            if (atpos < 1 || ( dotpos - atpos < 2 )) {
                   alert("Please enter correct Email")
                   event.preventDefault()
                   return;
                }
            if(document.myForm.phone.value.length !== 10){
                alert("Please enter a valid Phone Number");
                event.preventDefault()
                return; 
            }
            if(isNaN(document.myForm.phone.value)) {
                alert("Please enter a valid Phone Number");
                event.preventDefault()
                return; 
            }
            if(document.myForm.phone.value.startsWith('0')) {
                alert("Please enter a valid Phone Number");
                event.preventDefault()
                return;
            }
            if(document.myForm.phone.value.startsWith('1')) {
                alert("Please enter a valid Phone Number");
                event.preventDefault()
                return;
            }
           
            var entry = {
               number: "",
                name: this.name.value,
                email: this.email.value,
                phone: this.phone.value,
                id: parseInt(this.id_entry.value),
                
        };
        if (entry.id == 0) { // add
            Contacts.storeAdd(entry);
            Contacts.tableAdd(entry);
            showDetails();
            hideTable(); 
                detailName = document.createElement('p')
                detailName.innerHTML = 'Name: '+'<span class="detailEntry">'+entry.name+'</span>'
                detailEmail = document.createElement('p')
                detailEmail.innerHTML = 'Email: '+'<span class="detailEntry">'+entry.email+'</span>'
                detailPhone = document.createElement('p')
                detailPhone.innerHTML = 'Phone: '+'<span class="detailEntry">'+entry.phone+'</span>'
            

                detailsDiv.appendChild(detailName);
                detailsDiv.appendChild(detailEmail);
                detailsDiv.appendChild(detailPhone);

                $td = document.createElement("td");
                $td.innerHTML = '<a class="editBtn" data-op="edit" data-id="'+ entry.id +'">Edit</a>  <a class="deleteBtn" data-op="remove" data-id="'+ entry.id +'">Delete</a>';
                detailsDiv.appendChild($td);

        }
        else { // edit
            Contacts.storeEdit(entry);
            Contacts.tableEdit(entry);
        }

        this.reset();
        this.id_entry.value = 0;
        event.preventDefault();

        hideAdd();
    });

    Contacts.$editform.addEventListener("submit", function(event) {
          
        var entry = {
            number: "",
                name: this.name.value,
                email: this.email.value,
                phone: this.phone.value,
                id: parseInt(this.id_entry.value),
    };
    if( entry.name == "" ) {
        alert( "Please provide your name" );
        event.preventDefault()
        return;
     }
     if( entry.email == "" ) {
        alert( "Please provide your Email" );
        event.preventDefault()
        return;
     }
     if( entry.phone == "" ) {
         alert( "Please provide your Phone Number" );
         event.preventDefault()
         return;
     }
     var emailID = entry.email;
        atpos = emailID.indexOf("@");
        dotpos = emailID.lastIndexOf(".");
        
    if (atpos < 1 || ( dotpos - atpos < 2 )) {
           alert("Please enter correct Email")
           event.preventDefault()
           return;
        }
    if(entry.phone.length !== 10){
        alert("Please enter a valid Phone Number");
        event.preventDefault()
        return; 
    }
    if(isNaN(entry.phone)) {
        alert("Please enter a valid Phone Number");
        event.preventDefault()
        return; 
    }
    if(entry.phone.startsWith('0')) {
        alert("Please enter a valid Phone Number");
        event.preventDefault()
        return;
    }
    if(entry.phone.startsWith('1')) {
        alert("Please enter a valid Phone Number");
        event.preventDefault()
        return;
    }
 // edit
        Contacts.storeEdit(entry);
        Contacts.tableEdit(entry);

    this.reset();
    this.id_entry.value = 0;
    event.preventDefault();

    hideEdit();
    showTable();
    hideDetails();
} ); 
            
        // initialize table
        if (window.localStorage.length - 1) {
            var contacts_list = [], i, key;
            for (i = 0; i < window.localStorage.length; i++) {
                key = window.localStorage.key(i);
                if (/Contacts:\d+/.test(key)) {
                    contacts_list.push(JSON.parse(window.localStorage.getItem(key)));
                }
            }

            if (contacts_list.length) {
                contacts_list
                    .sort(function(a, b) {
                        return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
                    })
                    .forEach(Contacts.tableAdd);
            }
        }
        Contacts.$table.addEventListener("click", function(event) {
           var op = event.target.getAttribute("data-op");
            if (/edit|details|remove/.test(op)) {
                var entry = JSON.parse(window.localStorage.getItem("Contacts:"+ event.target.getAttribute("data-id")));
                if (op == "edit") {
                         showEdit();
                         hideTable();
                    
                    Contacts.$editform.name.value = entry.name;
                    Contacts.$editform.email.value = entry.email;
                    Contacts.$editform.phone.value = entry.phone;
                    Contacts.$editform.id_entry.value = entry.id;
                }
                
                if (op == "details") {
                    showDetails();
                    hideTable();   
                    detailName = document.createElement('p')
                    detailName.innerHTML = 'Name: '+'<span class="detailEntry">'+entry.name+'</span>'
                    detailEmail = document.createElement('p')
                    detailEmail.innerHTML = 'Email: '+'<span class="detailEntry">'+entry.email+'</span>'
                    detailPhone = document.createElement('p')
                    detailPhone.innerHTML = 'Phone: '+'<span class="detailEntry">'+entry.phone+'</span>'
               
               
                detailsDiv.appendChild(detailName);
                detailsDiv.appendChild(detailEmail);
                detailsDiv.appendChild(detailPhone);

                $td = document.createElement("td");
                $td.innerHTML = '<a class="editBtn" data-op="edit" data-id="'+ entry.id +'">Edit</a>  <a class="deleteBtn" data-op="remove" data-id="'+ entry.id +'">Delete</a>';
                detailsDiv.appendChild($td);
     

                }
                
                            
                else if (op == "remove") {
                    if (confirm('Are you sure you want to remove "'+ entry.name+'" from your contacts?')) {
                        Contacts.storeRemove(entry);
                        Contacts.tableRemove(entry);
                    }
                }
                event.preventDefault();
            }
        }, true);
    },

    storeAdd: function(entry) {
        entry.id = Contacts.index;
        window.localStorage.setItem("Contacts:index", ++Contacts.index);
        window.localStorage.setItem("Contacts:"+ entry.id, JSON.stringify(entry));
    },
    storeEdit: function(entry) {
        window.localStorage.setItem("Contacts:"+ entry.id, JSON.stringify(entry));
    },
    storeRemove: function(entry) {
        window.localStorage.removeItem("Contacts:"+ entry.id);
    },

    tableAdd: function(entry) {
        var $tr = document.createElement("tr"), $td, key;
        for (key in entry) {
            if (entry.hasOwnProperty(key)) {
                $td = document.createElement("td");
                $td.appendChild(document.createTextNode(entry[key]));
                $tr.appendChild($td);
            }
        }
        $td = document.createElement("td");
        $td.innerHTML = '<a class="detailsBtn" data-op="details" data-id="'+ entry.id +'">Details</a>  <a class="editBtn" data-op="edit" data-id="'+ entry.id +'">Edit</a>  <a class="deleteBtn" data-op="remove" data-id="'+ entry.id +'">Delete</a>';
        $tr.appendChild($td);
        $tr.setAttribute("id", "entry-"+ entry.id);
        Contacts.$table.appendChild($tr);
    },
    tableEdit: function(entry) {
        var $tr = document.getElementById("entry-"+ entry.id), $td, key;
        $tr.innerHTML = "";
        for (key in entry) {
            if (entry.hasOwnProperty(key)) {
                $td = document.createElement("td");
                $td.appendChild(document.createTextNode(entry[key]));
                $tr.appendChild($td);
            }
        }
        $td = document.createElement("td");
        $td.innerHTML = '<a class="detailsBtn" data-op="details" data-id="'+ entry.id +'">Details</a>  <a class="editBtn" data-op="edit" data-id="'+ entry.id +'">Edit</a>  <a class="deleteBtn" data-op="remove" data-id="'+ entry.id +'">Delete</a>';
        $tr.appendChild($td);
    },
    tableRemove: function(entry) {
        Contacts.$table.removeChild(document.getElementById("entry-"+ entry.id));
    }
};
Contacts.init();