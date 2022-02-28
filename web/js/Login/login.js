/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const TIME = 5000;
function loadSignUp()
{
    window.open("login.fin?cmdAction=loadSignUp", "_self");
}

function disableElement(id) {
    $('#' + id).prop('disabled', true);
}
function enableElement(id) {
    $('#' + id).prop('disabled', false);
}

function validateSignUp()
{
    var signUpForm = document.getElementById("RegisterForm");

    var result = validateUserData(signUpForm) && validate_email(signUpForm, "Email", "Email", true);
    console.log(result);
    if (result)
    {
        var param = getFormData(signUpForm);
        getSynchronousData("login.fin?cmdAction=login", param, 'status');

        var status = $("#RegisterStatus").val();
        if (status > 0)
        {
            showNotyfCallback("Registerd Successfully", "success", false, "", setTimeout(() => window.location = "login.fin?cmdAction=loadSignIn", TIME));
        } else
        {
            showNotyf("Some Problem Arise", "error");
        }
    }
}
function loadSignIn()
{
    window.open("login.fin?cmdAction=loadSignIn", "_self");
}

function loadRecoverPassword()
{
    window.open("login.fin?cmdAction=loadRecoverPassword", "_self");
}
function validateSignIn()
{
    var signInForm = document.getElementById("SignInForm");

    var result = validateUserData(signInForm);
    console.log(result);
    if (result)
    {
        var param = getFormData(signInForm);
        getSynchronousData("login.fin?cmdAction=verifyUser",param,'load');
        var verificationStatus = $("#VerifyUserStatus").val();
        console.log(verificationStatus);
        if(verificationStatus === '1')
        {
            showNotyfCallback("User Authorized", "success", false, "", setTimeout(() => window.location = "login.fin?cmdAction=loadHome", TIME));
//            window.open("login.fin?cmdAction=loadHome", "_self");
        }
        else
        {
            showNotyf("Invalid Username / Password", "error");
        }
    }
}

function validateUserData(formName)
{
    
    var result = validate_loginid(formName, 'UserName', 'User Name', true)
            && password_validate(formName, 'Password', 'Password', true);
    return result;
}

function EmailExist()
{
    var email = $("#Email").val();

    if (email.trim() !== "")
    {
        //    alert(email);
        getSynchronousData("login.fin?cmdAction=emailExist", "email=" + email, 'EmailError');
        var EmailStatus = $("#CheckEmailStatus").val();
//        console.log(EmailStatus);
        if (EmailStatus >= 1)
        {
            $("#Email").focus();
            disableElement('registerBtn');
        } else {
            enableElement('registerBtn');
        }
    }
}

function UserNameExist()
{
    var userName = $("#UserName").val();
    if (userName.trim() !== "")
    {
        getSynchronousData("login.fin?cmdAction=userNameExist", "userName=" + userName, 'UserNameError');
        var UserNameStatus = $("#CheckUserNameStatus").val();
        if (UserNameStatus >= 1)
        {
            $("#UserName").focus();
            disableElement('registerBtn');
        } else {
            enableElement('registerBtn');
        }
    }
}

function validatePassword()
{
    var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    var password = $("#Password").val();

    if (password.trim() !== "")
    {
        console.log(pattern.test(password));
        if (pattern.test(password) !== true)
        {
//            var str = "<span>Password must be 8 character long and must contain Uppercase and Lowercase alphabet, number and special characters.</span>";
            var str = `
                <ul>
                    <li>Password must be 8 character long</li>
                    <li>Must contains,</li>
                    <ul>
                        <li> Uppercase and Lowercase alphabet</li>
                        <li>Numeric Value.</li>
                        <li>Special characters.</li>
                    </ul>
                </ul>
            `
            $("#PasswordError").html(str);
            disableElement('registerBtn');
            $("#Password").focus();
        } else
        {
            $("#PasswordError").html("");
            enableElement('registerBtn');
        }
    }
}

function password_validate(frm,field_name,captionName,isCompulsory)
{
    var fieldvalue = frm.elements[field_name].value;
    if(fieldvalue.trim() === "")
    {
        alert("Enter valid value for \'"+captionName+"\'.");
        return false;
    }
    return true;
}