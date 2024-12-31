import { findLongestChain } from './utils/findLongestChain';
import './style.css'
import { validateInput } from './utils/validateInput';


const fileInput = document.getElementById('fileInput');
const output = document.getElementById('output');


fileInput.addEventListener('change', function (event) {
   const file = event.target.files[0];

   if (file) {
      const reader = new FileReader();
      const allowedMimeTypes = ["text/plain", "text/csv"];

      if (!allowedMimeTypes.includes(file.type)) {
         alert("Недопустимий тип файлу. Лише .txt або .csv");
         return;
      }
      reader.onload = function (e) {
         const fileContent = e.target.result;
         //регулярка для уніфікації під різні файли (txt,csv..etc)
         var inputData = fileContent.split(/\D+/)
         console.log(inputData)
         try {

            validateInput(inputData)
            var longestChain = findLongestChain(inputData)
            output.textContent = longestChain
         } catch (err) {

            output.textContent = err
         }



      };

      // Читаємо файл як текст
      reader.readAsText(file);
   }
});