function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchFieldName");
    filter = input.value.toUpperCase();
    ul = document.getElementById("main");
    li = ul.getElementsByClassName("grid-container");
    console.log(li[1]);
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h1")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


function myFunction2() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchFieldTag");
    filter = input.value.toUpperCase();
    ul = document.getElementById("main");
    li = ul.getElementsByClassName("grid-container");
    // console.log(li.length);
    for (i = 0; i < li.length; i++) {
        let length = li[i].getElementsByClassName("tags").length;
        console.log(length);
        // console.log(li[i].getElementsByClassName("tags").length);
        if (length == 0) {
            li[i].style.display = "none";
        } else {
            for (let o = 0; o < length; o++) {
                a = li[i].getElementsByClassName("tags")[o];


                txtValue = a.textContent || a.innerText || a.innerHTML;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    console.log(a);
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }

            }
        }



    }
}
let body1 = document.getElementById("main");

function read(data) {
    console.log(data);
    console.log(data.students.length);
    for (let i = 0; i < data.students.length; i++) {

        let wrapper = document.createElement("div");
        wrapper.setAttribute("class", "grid-container");
        body1.appendChild(wrapper);
        let leftContainer = document.createElement("div");
        leftContainer.setAttribute("class", "grid-left");
        wrapper.appendChild(leftContainer);
        let pic = document.createElement("img");
        pic.src = data.students[i]["pic"];
        leftContainer.appendChild(pic);

        let rightContainer = document.createElement("div");
        rightContainer.setAttribute("class", "grid-right");
        wrapper.appendChild(rightContainer);

        let name = document.createElement("h1");
        // console.log(data.students[i]["firstName"]);
        name.innerHTML = data.students[i]["firstName"].toUpperCase() + " " + data.students[i]["lastName"]
            .toUpperCase();
        name.setAttribute("class", "nameClass");
        let email = document.createElement("p");
        email.innerHTML = "Email: " + data.students[i]["email"];

        let company = document.createElement("p");
        company.innerHTML = "Company: " + data.students[i]["company"];

        rightContainer.appendChild(name);
        rightContainer.appendChild(email);
        rightContainer.appendChild(company);

        let skills = document.createElement("p");
        skills.innerHTML = "Skill: " + data.students[i]["skill"];

        rightContainer.appendChild(skills);

        let gradeAvr = document.createElement("p");
        gradeAvr.innerHTML = "Average: " + getAvr(data.students[i]["grades"]);

        rightContainer.appendChild(gradeAvr);

        let right2 = document.createElement("div");
        wrapper.appendChild(right2);
        right2.setAttribute("class", "grid-right2");


        //list of grades
        let gradesDetail = document.createElement("div");
        gradesDetail.setAttribute("class", "gradesDetail");
        rightContainer.appendChild(gradesDetail);
        for (let k = 0; k < data.students[i]["grades"].length; k++) {
            let grade = document.createElement("p");
            let num = k + 1;
            grade.innerHTML = "Test " + num + ":  " + data.students[i]["grades"][k];
            gradesDetail.appendChild(grade);

        }

        let tagInput = document.createElement("input");
        tagInput.placeholder = "Input a tag";
        rightContainer.appendChild(tagInput);



        // var input = document.getElementById("myInput");
        tagInput.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                let tag1 = tagInput.value;
                console.log(tag1);
                let tagPlace = document.createElement("button");
                tagPlace.setAttribute("class", "tags");
                tagPlace.innerHTML = tag1;
                tagPlace.disabled = true;
                tagPlace.setAttribute("class", "tagClass");
                rightContainer.appendChild(tagPlace);
            }
        });



        let addBtn = document.createElement("button");
        addBtn.innerHTML = "+";
        gradesDetail.style.display = "none";
        addBtn.setAttribute("class", "toggle");
        addBtn.setAttribute("id", data.students[i]["id"]);
        addBtn.addEventListener("click", addFunction);

        function addFunction() {
            // alert(this.id);
            if (addBtn.innerHTML.localeCompare("+") == 0) {
                gradesDetail.style.display = "block";
                addBtn.innerHTML = "-"
            } else {
                gradesDetail.style.display = "none";
                addBtn.innerHTML = "+";
            }
        }

        addBtn.setAttribute("class", "plus");
        right2.appendChild(addBtn);


        let line = document.createElement("HR");
        wrapper.appendChild(line);
        let break1 = document.createElement("BR");
        wrapper.appendChild(break1);



    }
}

function getAvr(sampleArray) {
    let total = 0;
    for (let j = 0; j < sampleArray.length; j++) {
        total = total + parseInt(sampleArray[j]);

    }

    let average = total / sampleArray.length;
    return average;
}
async function getData() {
    //await the response of the fetch call
    let response = await fetch('https://api.hatchways.io/assessment/students');
    //proceed once the first promise is resolved.
    let data = await response.json()
    //proceed only when the second promise is resolved
    return data;
}
//call getData function
getData()
    .then(
        data => read(data)


    ); //process the data