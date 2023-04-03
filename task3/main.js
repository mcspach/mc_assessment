// PART 1

// method to reverse the text when returned
const reverseString = str => [...str].reverse().join('');

//set variable for h1
const heading = document.getElementById('secret');

// fetch data from API
fetch("https://skills-assessment.oudemo.com/?type=secret&length=10")
  .then(response => response.json())
  .then(data => {
    // create variable for text
    secretKey = reverseString(data.key);
    //insert secret key into top level heading
    heading.innerHTML = secretKey;
  }).catch(error => console.warn('error', error));

// PART 2

//set variable for list
const facultyList = document.getElementById('faculty_list');
//set variable to add all the listings to table
let listingsContent = ``;

// fetch data from API
fetch("https://skills-assessment.oudemo.com/?type=faculty")
  .then(response => response.json())
  .then(data => {
    //convert to an array of objects
    facultyArray = Object.values(data);
    //sort by last name
    facultyArray.sort((x, y) => {
      if (x.lastname < y.lastname) { return -1; }
      else if (x.lastname > y.lastname) { return 1; }
      else {
        if (x.firstname < y.firstname) { return -1; }
        else if (x.firstname > y.firstname) { return 1; }
        return 0;
      }
    });

    // iterate the array
    facultyArray.forEach(item => {
      console.log(item);
      // create html for each faculty member item (with real data)
      if (item.firstname) {
        listingsContent += `
            <tr>
                <td>${item.lastname}</td>
                <td>${item.firstname}</td>
                <td>${item.title}</td>
                <td>${item.department}</td>
                <td>${item["office-hours"]}</td>
                <td>${item.phone}</td>
            </tr>
            `;

      }
    });
    // insert listings into page
    facultyList.innerHTML = listingsContent;
  }).catch(error => console.warn('error', error));


// Filter buttons which change the column used for filtering
let filterColumn = 0;
const buttons = [...document.getElementsByTagName('button')];
buttons.forEach((btn) => {
  btn.addEventListener('click', function (event) {
    const selectedFilter = event.target.innerHTML;
    // console.log(selectedFilter);
    if (selectedFilter === 'First') { filterColumn = 1; }
    else if (selectedFilter === 'Title') { filterColumn = 2; }
    else if (selectedFilter === 'Department') { filterColumn = 3; }
    else { filterColumn = 0; }
    // Rerender table after setting filter column to match button
    filterTable();
  });
});

//Searching filter 
function filterTable() {
  // Declare variables
  let filter = document.getElementById('searchBar').value.toUpperCase();
  let tr = document.getElementById('faculty_list').getElementsByTagName('tr');

  // Loop through table, and hide rows that don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[filterColumn];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}