module.exports = (applicant) => {
   const today = new Date();
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>Result</title>
          <style>
               h1{
               text-align: center;
               }
               table {
               font-family: arial, sans-serif;
               border: 1px solid black;
               border-collapse: collapse;
               width: 100%;
               }

               td, th {
               border: 1px solid black;
               text-align: left;
               padding: 8px;
               }

               tr:nth-child(even) {
               background-color: #dddddd;
               }
          </style>
       </head>
       <body>
          <div class="container-gen">
          <h1>List accepted students as of : ${today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear()}</h1>
            <table>
               <tr>
                  <th>Full Name</th>
                  <th>PFE</th>
                  <th>PFE ID</th>
               </tr>
               ${applicant.map((element, i)=>(
                  `<tr key=${i}>
                     <td>${element.username}</td>
                     <td>${element.title}</td>
                     <td>${element.offer_id}</td>
                  </tr>`
               ))}
            </table>
          </div>
       </body>
    </html>
    `;
};