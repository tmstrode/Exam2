function CatMenuChoice()
    {
             
        if (document.getElementById("catmenu").value == "Category List")
            {
                document.getElementById("catlist1").style.display = 'block';
                document.getElementById("createcat2").style.display = "none";
                document.getElementById("customerdelete3").style.display = "none";
                document.getElementById("deletecat4").style.display = "none";
                document.getElementById("about5").style.display = "none";
            }
            
        else if (document.getElementById("catmenu").value == "Create Category")
        {
            document.getElementById("catlist1").style.display = "none";
            document.getElementById("createcat2").style.display = 'block';
            document.getElementById("updatecat3").style.display = "none";
            document.getElementById("deletecat4").style.display = "none";
            document.getElementById("about5").style.display = "none";
        }
        
        else if (document.getElementById("catmenu").value == "Update Category Description")
        {
            document.getElementById("catlist1").style.display = "none";
            document.getElementById("createcat2").style.display = "none";
            document.getElementById("updatecat3").style.display = 'block';
            document.getElementById("deletecat4").style.display = "none";
            document.getElementById("about5").style.display = "none";
        }
        
        else if (document.getElementById("catmenu").value == "Delete Category")
        {
            document.getElementById("catlist1").style.display = "none";
            document.getElementById("createcat2").style.display = "none";
            document.getElementById("updatecat3").style.display = "none";
            document.getElementById("deletecat4").style.display = 'block';
            document.getElementById("about5").style.display = "none";
        }
        
        else if (document.getElementById("catmenu").value == "About Me")
        {
            document.getElementById("catlist1").style.display = "none";
            document.getElementById("createcat2").style.display = "none";
            document.getElementById("updatecat3").style.display = "none";
            document.getElementById("deletecat4").style.display = "none";
            document.getElementById("about5").style.display = 'block';
        }
        
        else
        {
            document.getElementById("catlist1").style.display = "none";
            document.getElementById("createcat2").style.display = "none";
            document.getElementById("updatecat3").style.display = "none";
            document.getElementById("deletecat4").style.display = "none";
            document.getElementById("about5").style.display = "none";
        }
        
        

    }
    
function GetCatList()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX Request Object
    
    //Create URL & Query string
    var caturl = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var catlistoutput = JSON.parse(objRequest.responseText);
            GenerateCatListOutput(catlistoutput);
        }
    }
    
    //Initiate the server request
    objRequest.open("GET", caturl, true); //Open connection
    objRequest.send(); //Send data
}

function GenerateCatListOutput(result)
{
    var count = 0;
    var displaycatlisttext = "<table border='1'><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th>"; //string
    
    //Loop to extract data from the response object
    for (count = 0; count < result.GetAllCategoriesResult.length; count++)
    {
        displaycatlisttext += "<tr><td>" + result.GetAllCategoriesResult[count].CID +
        "<td>" + result.GetAllCategoriesResult[count].CName + "</td>" +
        "<td>" + result.GetAllCategoriesResult[count].CDescription + "</tr></td>" + 
        "<br>"; //row
        
    }
    displaycatlisttext += "</table>";
    document.getElementById("catlistdisplay").innerHTML = displaycatlisttext;
}

function CreateCat()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX Request Object
    
    //Create URL
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    //Collect customer data from web page
    var categoryname = document.getElementById("catname").value;
    var categorydescription = document.getElementById("catdesc").value;
    
    //Create the parameter string
     var newcategory = '{"CName":"' + categoryname + '","CDescription":"' + categorydescription +'"}';
    
     
     //Checking for AJAx operation return
     objRequest.onreadystatechange = function()
     {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            CreateOperationResult(result);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcategory);
}

function CreateOperationResult(output)
{
     if (output.WasSuccessful == 1)
     {
        document.getElementById("result").innerHTML = "Operation completed successfully";
     }
     else
     {
        document.getElementById("result").innerHTML = "Operation failed" + "<br>" + output.Exception;
     }
}

function UpdateCatDesc()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX Request Object
    
    //Create URL
    var descurl = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    //Collect customer data from web page
    var catident = document.getElementById("catid").value;
    var newcategorydesc = document.getElementById("newcatdesc").value;
    
    //Create the parameter string
     var updateddesc = '{"CID":"' + catident + '","CDescription":"' + newcategorydesc +'"}';
    
     
     //Checking for AJAx operation return
     objRequest.onreadystatechange = function()
     {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            DescOperationResult(result);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", descurl, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(updateddesc); 
}

function DescOperationResult(output)
{
     if (output.WasSuccessful == 1)
     {
        document.getElementById("catresult").innerHTML = "The operation was successful!";
     }
     
     else if (output.WasSuccessful == 0)
     {
        document.getElementById("catresult").innerHTML = "Operation failed with an unspecified error";
     }
     
     else if (output.WasSuccessful == -2)
     {
        document.getElementById("catresult").innerHTML = "Operation failed because the data string supplied could not be deserialized into the service object";
     }
     
     else if (output.WasSuccessful == -3)
     {
        document.getElementById("catresult").innerHTML = "Operation failed because a record with the supplied Order ID could not be found";
     }
     
}


function DelCategory()
{
  var objRequest = new XMLHttpRequest(); //Create AJAX Request Object
    
    //Create URL & Query string
    var catdelurl =  "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    catdelurl += document.getElementById("catident").value; //Query String
    
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var catdeloutput = JSON.parse(objRequest.responseText);
            GenerateCustomerDelOutput(catdeloutput);
        }
    }
    
    //Initiate the server request
    objRequest.open("GET", catdelurl, true); //Open connection
    objRequest.send(); //Send data  
}


function GenerateCustomerDelOutput(result)
{
    
    if (result.DeleteCategoryResult.WasSuccessful  == 1)
     {
        document.getElementById("delresult").innerHTML = "Operation completed successfully";
     }
     else
     {
        document.getElementById("delresult").innerHTML = "Operation failed – Error Message included" + "<br>" + result.Exception;
     }

     
}

function GetAbout()
{
    var displayabouttext =
    "My name is Taylor Strode. I'm 21 years old and graduating in the summer of 2018. This course has been extremely insightful, and I am sure it will be very useful in my future endeavors. "; 
    document.getElementById("aboutmedisplay").innerHTML = displayabouttext;
}