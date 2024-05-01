// document.addEventListener('DOMContentLoaded', function () {
//     const select = document.getElementById('useCases');

//     select.addEventListener('focus', function() {
//         select.size = select.length;  // Expands the select dropdown fully
//     });

//     select.addEventListener('blur', function() {
//         select.size = 0.1; // Collapses the select dropdown
//     });

//     window.addEventListener('click', function(e) {
//         if (!select.contains(e.target)) {
//             select.size = 0.1;
//         }
//     });

//     function updateSelectBoxDisplay() {
//         let displayText = Array.from(select.selectedOptions)
//                                .map(option => option.textContent)
//                                .join(', ');
//         if (displayText === '') {
//             displayText = 'Select use cases';
//         }
//         select.setAttribute('data-display', displayText);
//     }

//     select.addEventListener('change', updateSelectBoxDisplay);
//     updateSelectBoxDisplay();
// });


    // function formatDate(dateString) {
    //     const date = new Date(dateString);
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const day = String(date.getDate()).padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    // }

    // document.getElementById('birthdate').addEventListener('change', function() {
    //     const hiddenInput = document.getElementById('hiddenBirthdate');
    //     hiddenInput.value = this.value;
    // });
