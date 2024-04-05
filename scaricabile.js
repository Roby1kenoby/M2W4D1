/*
PARTE 1: 
Oggi analizzeremo un problema molto comune: realizzare algoritmi di ricerca.
Il tuo compito è creare una funzione che cercherà per posizione lavorativa E posizione geografica. Questi due valori verranno passati come parametri
Ti abbiamo fornito un array chiamato "jobs" in fondo al file, NON modificarlo in alcun modo.
L'algoritmo che devi realizzare cercherà SIA per posizione lavorativa che per posizione geografica.
Prendi queste tre inserzioni ad esempio:

      job1:  location: "NY, US",     title: "java dev"
      job2:  location: "Genoa, IT"   title: "web dev"
      job3:  location: "US"      title: "dev"

Cercando contemporaneamente come posizione lavorativa "dev" e posizione geografica "US", dovresti ottenere come risultato solamente job1 e job3,
in quanto job2 non soddisfa la condizione posta sulla posizione geografica.

REQUISITI:
- il tuo algoritmo deve tornare i risultati nella seguente forma:
{
  result: [], <-- inserisci qui le inserzioni che rispecchiano la posizione lavorativa e la posizione geografica richiesta
  count: 0 <-- inserisci qui il numero totale delle inserzioni trovate
}

- la tua ricerca deve essere "case insensitive" (non deve essere influenzata da lettere maiuscole o minuscole nelle parole cercate). Questo e' possibile trasformando tutto in lettere minuscole con .toLowerCase()


PARTE 2: 
Nella pagina HTML, inserisci 2 input di tipo testo (uno per la location e uno per il titolo lavorativo, ricordati di diversificarli con un id) e un bottone con valore “cerca”

Al click del bottone, il codice deve raccogliere i valori dei due input e darli in pasto alla funzione che hai creato nella parte 1. 

Dopo aver raccolto ed elaborato i dati, e’ il momento di mostrare i risultati sulla pagina: 
    Puoi scegliere tu se utilizzare un semplice ul / li oppure una tabella 
    Vai passo per passo e usa molti console.log per capire eventualmente dove sbagli
    SUGGERIMENTO: ti servira’ un ciclo for!

*/

// NON MODIFICARE QUESTO ARRAY!
const jobs = [
  { title: "Marketing Intern", location: "US, NY, New York" },
  {
    title: "Customer Service - Cloud Video Production",
    location: "NZ, Auckland",
  },
  {
    title: "Commissioning Machinery Assistant (CMA)",
    location: "US, IA, Wever",
  },
  {
    title: "Account Executive - Washington DC",
    location: "US, DC, Washington",
  },
  { title: "Bill Review Manager", location: "US, FL, Fort Worth" },
  { title: "Accounting Clerk", location: "US, MD," },
  { title: "Head of Content (m/f)", location: "DE, BE, Berlin" },
  {
    title: "Lead Guest Service Specialist",
    location: "US, CA, San Francisco",
  },
  { title: "HP BSM SME", location: "US, FL, Pensacola" },
  {
    title: "Customer Service Associate - Part Time",
    location: "US, AZ, Phoenix",
  },
  {
    title: "ASP.net Developer Job opportunity at United States,New Jersey",
    location: "US, NJ, Jersey City",
  },
  {
    title: "Talent Sourcer (6 months fixed-term contract)",
    location: "GB, LND, London",
  },
  {
    title: "Applications Developer, Digital",
    location: "US, CT, Stamford",
  },
  { title: "Installers", location: "US, FL, Orlando" },
  { title: "Account Executive - Sydney", location: "AU, NSW, Sydney" },
  {
    title: "VP of Sales - Vault Dragon",
    location: "SG, 01, Singapore",
  },
  { title: "Hands-On QA Leader", location: "IL, Tel Aviv, Israel" },
  {
    title: "Southend-on-Sea Traineeships Under NAS 16-18 Year Olds Only",
    location: "GB, SOS, Southend-on-Sea",
  },
  { title: "Visual Designer", location: "US, NY, New York" },
  {
    title: "Process Controls Engineer - DCS PLC MS Office - PA",
    location: "US, PA, USA Northeast",
  },
  { title: "Marketing Assistant", location: "US, TX, Austin" },
  { title: "Front End Developer", location: "NZ, N, Auckland" },
  { title: "Engagement Manager", location: "AE," },
  {
    title: "Vice President, Sales and Sponsorship (Businessfriend.com)",
    location: "US, CA, Carlsbad",
  },
  { title: "Customer Service", location: "GB, LND, London" },
  { title: "H1B SPONSOR FOR L1/L2/OPT", location: "US, NY, New York" },
  { title: "Marketing Exec", location: "SG," },
  {
    title: "HAAD/DHA Licensed Doctors Opening in UAE",
    location: "AE, AZ, Abudhabi",
  },
  {
    title: "Talent Management Process Manager",
    location: "US, MO, St. Louis",
  },
  { title: "Customer Service Associate", location: "CA, ON, Toronto" },
  {
    title: "Customer Service Technical Specialist",
    location: "US, MA, Waltham",
  },
  { title: "Software Applications Specialist", location: "US, KS," },
  { title: "Craftsman Associate", location: "US, WA, Everett" },
  { title: "Completion Engineer", location: "US, CA, San Ramon" },
  { title: "I Want To Work At Karmarama", location: "GB, LND," },
  {
    title: "English Teacher Abroad",
    location: "US, NY, Saint Bonaventure",
  },
]

// creating the initial table structure with the starting jobs
window.onload = function () {
  createTable(jobs)
}

// function to create a table from a jobs Array (so i can reuse it)
function createTable(jobsArray){
  // finding the table body in the html page
  let table = this.document.getElementsByTagName("tbody")[0]
  let tableFooter = this.document.getElementsByTagName("tfoot")[0]
  // for each element in the job array i create a table row, with 2 table data, one for the location, one for the job
  for (let j of jobsArray){
    let row = document.createElement("tr")
    let loc = document.createElement("td")
    let job = document.createElement("td")
    loc.innerHTML = j.location
    job.innerHTML = j.title
    // i append the 2 data to row, and then the row to the table
    row.appendChild(loc)
    row.appendChild(job)
    // i use a class name to easily find later the rows i have to delete
    row.className = 'jobRow'
    table.appendChild(row)
  }
  tableFooter.innerHTML = `<p><b># of jobs found: ${document.querySelectorAll(".jobRow").length}</b></p>`
}

// function to delete all the data in the table
function clearTable(){
  let rows = document.querySelectorAll(".jobRow")
  for (let r of rows){
    r.remove()
  }
}

// function to search for specific job and location
function search(location, job){
  // using toLowerCase to get a case insensitive search
  l = location.toLowerCase()
  j = job.toLowerCase()
  // resonse object
  let respObject = {}
  // array to store selected jobs
  let resultsArray = []
  // cycling jobs and pushing the one that are ok with the search parameters
  for (let jobDesc of jobs){
    if (jobDesc.location.toLowerCase().search(l) >= 0 && jobDesc.title.toLowerCase().search(j) >= 0){
      resultsArray.push(jobDesc)
    }
  }
  // composing the object
  respObject.result = resultsArray
  respObject.count = resultsArray.length
  
  return respObject
}

// function to reset form input fields
function resetForm(){
  document.getElementById("location").value = null
  document.getElementById("jobDescription").value = null
}

// function called by the button find me a job
function findMyJob(){
  // getting the values in the input fields
  loc = document.getElementById("location").value
  job = document.getElementById("jobDescription").value

  // calling the function to find the right jobs
  obj = search(loc, job)
  // clearing the table 
  clearTable()
  // creating the table with the results of the search
  createTable(obj.result)
}

// function called by the reset table button
function resetJobs(){
  clearTable()
  createTable(jobs)
  resetForm()
}
