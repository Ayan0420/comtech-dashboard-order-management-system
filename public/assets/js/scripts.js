/* dynamically change the balance based on the values of s_charge and s_downpayment */
let s_charge = $('#s_charge');
let s_downpayment = $('#s_downpay');
let s_balance = $('#s_bal');

$('.sumVari').each(function() {
  $(this).change(function() {
    if (s_charge.val() != '' && s_downpayment.val() != '') {
      s_balance.val(s_charge.val() - s_downpayment.val()).change();
    }
  });
});

/* dynamically change the balance based on the values of p_charge and p_downpayment */
let p_charge = $('#p_price');
let p_downpayment = $('#p_downpay');
let p_balance = $('#p_bal');

$('.sumVari').each(function() {
  $(this).change(function() {
    if (p_charge.val() != '' && p_downpayment.val() != '') {
      p_balance.val(p_charge.val() - p_downpayment.val()).change();
    }
  });
});

// Update Job Order Button

$("#update-jo-button").click(
() => {
    $("#save-button").removeClass("visually-hidden");
    $("#delete-button").removeClass("visually-hidden");
    $("#cancel-edit-button").removeClass("visually-hidden");
    
    $("#update-jo-button").addClass("visually-hidden");
    $("#form-fields").removeAttr("disabled");
    
});

$("#cancel-edit-button").click(
() => {
    $("#save-button").addClass("visually-hidden");
    $("#cancel-edit-button").addClass("visually-hidden");
    $("#delete-button").addClass("visually-hidden");
    $("#update-jo-button").removeClass("visually-hidden");
    location.reload();
});

