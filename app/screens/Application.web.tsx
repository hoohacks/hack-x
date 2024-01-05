// firebase
import { runTransaction, Timestamp, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { UploadTask, getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
import { FIREBASE_STORAGE, FIRESTORE_DB, FIREBASE_AUTH } from "../../firebase/FirebaseConfig";
import { User } from "firebase/auth";

// react
import { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Linking,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import Checkbox from "expo-checkbox";

// static
import { styles } from "../../assets/style/ApplicationStyle";
import NumberInput from "../../assets/components/NumberInput";
import DatePicker from "../../assets/components/DatePicker";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Application = ({ navigation }: RouterProps) => {
  const [birthdate, setBirthdate] = useState(new Date());
  const [chosenBirthdate, setChosenBirthdate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [otherGender,setOtherGender] = useState("");
  const [race, setRace] = useState("");
  const [otherRace,setOtherRace] = useState("");
  const [school, setSchool] = useState("");
  const [otherSchool,setOtherSchool] = useState("");
  const [describe, setDescribe] = useState("");
  const [major, setMajor] = useState("");
  const [numHackathons, setNumHackathons] = useState("");
  const [reason, setReason] = useState("");
  const [mlhPrivacyAndTermsNCondition, setMlhPrivacyAndTermsNCondition] =
    useState(false);
  const [mlhCodeofConduct, setMlhCodeofConduct] = useState(false);
  const [mlhAdvertisement, setMlhAdvertisement] = useState(false);


  const schoolNames: string[] = [
    "Select",
    "The University of Virginia",
    "ABES Engineering College",
    "AGH University of Science and Technology",
    "Aalto University",
    "Aarhus University",
    "Abbey Park High School",
    "Abbey Park Middle School",
    "Abington Senior High School",
    "Abraham Lincoln High School",
    "Academy of Technology",
    "Acardia High School, Arizona",
    "Acharya Institute of Technology",
    "Acton-Boxborough Regional High School",
    "Adelphi University",
    "Adlai E. Stevenson High School",
    "Advanced Math and Science Academy Charter School",
    "Alameda High School",
    "Albany Medical College",
    "Alfa College",
    "Allen High School",
    "Ambala College of Engineering and Applied Research",
    "American Heritage School",
    "American River College, California",
    "American University, Washington, D.C.",
    "Amherst College",
    "Amity University",
    "Amrita School of Engineering",
    "Ancaster High School",
    "Anchor Bay High School",
    "Andover Central High School",
    "Anna University",
    "Arcadia High School, California",
    "Arizona State University",
    "Aston University",
    "Atlanta Metropolitan State College",
    "Atlantic Cape Community College",
    "Austin Community College District",
    "Aviation Career & Technical Education High School",
    "Avon High School",
    "BMIIT, Uka Tarsadia University, Bardoli, Surat",
    "Babaria Institute of Technology",
    "Babson College",
    "Baruch College, CUNY",
    "Baton Rouge Community College",
    "Bayside High School",
    "Bayview Secondary School",
    "Beihang University",
    "Bellevue College, Washington",
    "Benedictine College",
    "Benha University",
    "Bentley University",
    "Bergen Catholic High School",
    "Bergen Community College",
    "Bergen County Academies",
    "Berkshire Community College",
    "Bharathiar University",
    "Bilkent University",
    "Binghamton University",
    "Birkbeck, University of London",
    "Birmingham City University",
    "Blinn College",
    "Bloomsburg University of Pennsylvania",
    "Blue Mountain Academy",
    "BlueCrest University College",
    "Boca Raton Community High School",
    "Boston College",
    "Boston Latin School",
    "Boston University",
    "Boston University Metropolitan College",
    "Bourne Grammar School",
    "Bournemouth University",
    "Bowdoin College",
    "Bowie State University",
    "Brampton Centennial Secondary School",
    "Brandeis University",
    "Briar Cliff University",
    "Brigham Young University",
    "Brock University",
    "Brookdale Community College",
    "Brooklyn Technical High School",
    "Brooklyn College, CUNY",
    "Medgar Evers College, CUNY",
    "Brookwood High School",
    "Brown University",
    "Bucknell University",
    "Business Academy Aarhus",
    "COMSATS Institute of Information Technology",
    "Caldwell University",
    "California High School",
    "California Institute of Technology",
    "California Polytechnic State University, San Luis Obispo",
    "California State Polytechnic University, Pomona",
    "California State University, Fresno",
    "California State University, Fullerton",
    "California State University, Long Beach",
    "California State University, Los Angeles",
    "California State University, Northridge",
    "California State University, Sacramento",
    "California State University, San Bernardino",
    "California State University, Bakersfield",
    "California State University, San Francisco",
    "California State University, Channel Islands",
    "California State University, Maritime",
    "California State University, San Jose",
    "California State University, Chico",
    "California State University, Monterey Bay",
    "California State University, San Luis Obispo",
    "California State University, Dominguez Hills",
    "California State University, San Marcos",
    "California State University, East Bay",
    "California State University, Sonoma",
    "California State University, Stanislaus",
    "California State University, Humboldt",
    "California State University, San Diego",
    "Camden County College",
    "Cameron Heights Collegiate Institute",
    "Canyon Crest Academy",
    "Carleton College",
    "Carleton University",
    "Carnegie Mellon University",
    "Carteret High School",
    "Carthage College",
    "Case Western Reserve University",
    "Case Western Reserve University School of Medicine",
    "Cathedral High School, Los Angeles",
    "Cedar Creek High School",
    "Cedar Ridge High School",
    "Cedarville University",
    "Centennial High School",
    "Cégep André-Laurendeau",
    "Cégep de Saint-Laurent",
    "Cégep du Vieux Montréal",
    "Cégep Marie-Victorin",
    "Central Connecticut State University",
    "Central Peel Secondary School",
    "Central Texas College",
    "Cerritos College",
    "Chalmers University of Technology",
    "Champlain College",
    "Channabasaveshwara Institute of Technology",
    "Chaparral Star Academy",
    "Chapel Hill High School",
    "Chattahoochee Technical College",
    "Cherokee High School",
    "Cherry Hill High School East",
    "Chinguacousy Secondary School",
    "Cincinnati State Technical and Community College",
    "Citrus College",
    "City University London",
    "Claremont McKenna College",
    "Clark University",
    "Clarksburg High School",
    "Clarkson University",
    "Clemson University",
    "Cleveland State University",
    "Coe College",
    "Colegio Simón Bolívar",
    "Colgate University",
    "Collège Ahuntsic",
    "Collège André-Grasset",
    "Collège de Bois-de-Boulogne",
    "Collège de Maisonneuve",
    "Collège de Montréal",
    "Collège de Rosemont",
    "Collège Français",
    "Collège Jean-de-Brébeuf",
    "Collège Jean-Eudes",
    "College of Charleston",
    "College of Engineering, Pune",
    "College of Staten Island, CUNY",
    "College of Westchester",
    "Collège Regina Assumpta",
    "Colleyville Heritage High School",
    "Collins Hill High School",
    "Collège Lionel-Groulx",
    "Colorado School of Mines",
    "Columbia Secondary School",
    "Columbia University",
    "Columbus College of Art and Design",
    "Columbus State Community College",
    "Comenius University",
    "Community College of Allegheny County",
    "Community College of Baltimore County",
    "Community College of Rhode Island",
    "Concord Academy",
    "Concordia University",
    "Conestoga College",
    "Connecticut College",
    "Conroe ISD Academy of Science and Technology, Texas",
    "Cooper Union",
    "Coral Glades High School",
    "Cornell College",
    "Cornell University",
    "Council Rock High School South",
    "County College of Morris",
    "Covenant University",
    "Coventry University",
    "Cranbrook Schools",
    "Cranfield University",
    "Creekview High School",
    "Cupertino High School",
    "Dartmouth College",
    "Dawson College",
    "DePaul University",
    "DePauw University",
    "DeSales University",
    "Deerfield High School",
    "Del Norte High School",
    "Delhi Technological University",
    "Denison University",
    "Des Moines Area Community College",
    "Dharmsinh Desai University",
    "Diablo Valley College",
    "Dougherty Valley High School",
    "Dr. B. R. Ambedkar National Institute of Technology Jalandhar",
    "Drake University",
    "Drew University",
    "Drexel University",
    "Dublin High School",
    "Dublin Jerome High School",
    "Duke University",
    "Dulaney High School",
    "Duquesne University",
    "Durant High School",
    "Durham College",
    "Durham University",
    "Dwarkadas J. Sanghvi College of Engineering",
    "Dwight-Englewood School",
    "Earl of March Secondary School",
    "Earlham College",
    "East Brunswick High School",
    "East Central University",
    "East Chapel Hill High Schoo",
    "East Los Angeles College",
    "Eastern Michigan University",
    "Eckerd College",
    "Edina High School",
    "Edinburgh Napier University",
    "Edison High School",
    "Edward R. Murrow High School",
    "El Camino College",
    "El Centro College",
    "Elgin Academy",
    "Elizabeth High School",
    "Embry-Riddle Aeronautical University",
    "Emory University",
    "Erasmus Hogeschool Brussel",
    "Ernest Manning High School",
    "Evergreen Valley College",
    "Fachhochschule Dortmund",
    "Fahaheel Al-Watanieh Indian Private School",
    "Fairfield University",
    "Fairleigh Dickinson University",
    "Fairview High School",
    "Farmingdale State College",
    "FernUniversität in Hagen",
    "Fitchburg State University",
    "Florida Atlantic University",
    "Florida Gulf Coast University",
    "Florida Institute Of Technology",
    "Florida International University",
    "Florida Polytechnic University",
    "Florida State University",
    "Fontys Hogeschool",
    "Foothill College",
    "Fordham University",
    "Fort Scott Community College",
    "Fr. Conceicao Rodrigues College of Engineering",
    "Francis Holland School",
    "Francis Lewis High School",
    "Franklin High School",
    "Franklin W. Olin College of Engineering",
    "Frederick Community College",
    "Freedom High School",
    "Freehold High School",
    "Full Sail University",
    "Fullerton College",
    "GIDC Degree Engineering College",
    "Ganga International School",
    "Ganpat University",
    "Garnet Valley High School",
    "George C. Marshall High School",
    "George Heriot's School",
    "George Mason University",
    "Georgetown University",
    "Georgia Institute of Technology",
    "Georgia State University",
    "Germantown Friends School",
    "Glassboro High School",
    "Glenaeon Rudolf Steiner School",
    "Glenbrook North High School",
    "Glendale Community College",
    "Glenforest Secondary School",
    "Goldsmiths, University of London",
    "Gordon Graydon Memorial Secondary School",
    "Gottfried Wilhelm Leibniz Universität Hannover",
    "Government Model Engineering College, Thrikkakara",
    "Grady High School",
    "Grand Rapids Community College",
    "Grand Valley State University",
    "Greater Lowell Technical High School",
    "Green River College",
    "Greenwood College School",
    "Grinnell College",
    "Guelph Collegiate Vocational Institute",
    "Gujarat Technological University",
    "Gujarat University",
    "Guru Gobind Singh Indraprastha University",
    "Hampshire College",
    "Hampton University",
    "Hanze University of Applied Sciences",
    "Harper College",
    "Harvard Medical School",
    "Harvard University",
    "Hasso-Plattner-Institut Academy",
    "Haverford College",
    "Hazleton Area High School",
    "Head-Royce School",
    "Health Careers High School",
    "Helwan University",
    "Henry M. Gunn High School",
    "Herguan University",
    "Heritage Institute of Technology",
    "Het Baarnsch Lyceum",
    "High Technology High School",
    "Highland Park High School",
    "Hillsborough High School",
    "Hinsdale Central High School",
    "Hiram College",
    "Hofstra University",
    "Hogeschool Thomas More",
    "Holton-Arms School",
    "Homestead High School",
    "Hong Kong University of Science and Technology",
    "Horace Mann School",
    "Houghton High School",
    "Howard University",
    "Hudson County Community College",
    "Hudson Valley Community College",
    "Hunter College High School",
    "H.N. Werkman College",
    "I.T.S Engineering College",
    "IT University of Copenhagen",
    "Iliria College",
    "Illinois Institute of Technology",
    "Illinois State University",
    "Imperial College London",
    "Indian Hills Community College",
    "Indian Institute of Engineering Science and Technology Shibpur",
    "Indian Institute of Technology Allahabad",
    "Indian Institute of Technology Bhubaneswar",
    "Indian Institute of Technology Bombay",
    "Indian Institute of Technology Gandhinagar",
    "Indian Institute of Technology Guwahati",
    "Indian Institute of Technology Gwalior",
    "Indian Institute of Technology Hyderabad",
    "Indian Institute of Technology Jabalpur",
    "Indian Institute of Technology Jodhpur",
    "Indian Institute of Technology Kanpur",
    "Indian Institute of Technology Kharagpur",
    "Indian Institute of Technology Kota",
    "Indian Institute of Technology Madras",
    "Indian Institute of Technology Roorkee",
    "Indian Institute of Technology Ropar",
    "Indian School of Mines, Dhanbad",
    "Indiana University",
    "Indiana University of Pennsylvania",
    "Indiana University-Purdue University Fort Wayne",
    "Indiana University–Purdue University Indianapolis",
    "Indira Gandhi Delhi Technical University for Women",
    "Indira Gandhi National Open University",
    "Indraprastha Institute of Information Technology",
    "Institute of Engineering and Rural Technology Allahabad",
    "Instituto Politécnico Nacional",
    "Instituto Tecnologico Superior de San Martin Texmelucan",
    "Instituto Tecnológico y de Estudios Superiores de Monterrey (ITESM)",
    "Instytut Pamięci Narodowej",
    "International Institute Of Information Technology-Naya Raipur",
    "International Institute of Information Technology-Hyderabad",
    "International Leadership Charter High School",
    "International School of Choueifat",
    "Iowa Central Community College",
    "Iowa State University",
    "Iowa Western Community College",
    "Istanbul University",
    "Ithaca College",
    "Jacobs University Bremen",
    "Jagiellonian University",
    "Jaipur National University",
    "Jalpaiguri Government Engineering College",
    "James Gillespie's High School",
    "James Madison High School",
    "James Madison University",
    "Jaypee Institute Of Information Technology",
    "John A. Ferguson Senior High School",
    "John Abbott College",
    "John F. Kennedy Memorial High School",
    "John Leggott College",
    "John P. Stevens High School",
    "Johns Hopkins University",
    "Johnson & Wales University",
    "Johnson C. Smith University",
    "K.S. School of Business Management",
    "Kansas State University",
    "Kantipur Engineering College",
    "Kean University",
    "Keele University",
    "Kennesaw State University",
    "Kennett High School",
    "Kent State University",
    "King's College London",
    "Kraków University of Economics",
    "L D College Of Engineering Library",
    "La Roche College",
    "Lafayette College",
    "Lake Braddock Secondary School",
    "Lakeside High School",
    "Lampeter-Strasburg High School",
    "Lancaster University",
    "Laval University",
    "Lawrence Technological University",
    "Lawrence University",
    "Lehigh University",
    "Leiden University",
    "Lewis & Clark College",
    "Lewis University",
    "Lexington High School",
    "Lick Wilmerding High School",
    "Lincoln University",
    "Lindenwood University",
    "Linn-Mar High School",
    "Lisgar Collegiate Institute",
    "Little Flowers Public Sr Secondary School",
    "Livingston High School",
    "Lodz University of Technology",
    "London Metropolitan University",
    "London School of Economics and Political Science",
    "Lone Star College System",
    "Lord Krishna College of Engineering",
    "Los Altos High School",
    "Loughborough University",
    "Louisiana State University",
    "Lowell High School",
    "Lynbrook High School",
    "M.V.Jayaraman College of Engineering",
    "MBM Engineering College, Jodhpur",
    "MacArthur High School",
    "Macalester College",
    "Macaulay Honors College, CUNY",
    "Macomb Community College",
    "Madan Mohan Malaviya University of Technology",
    "Madison College",
    "Maggie L. Walker Governor's School",
    "Maharaja Agrasen Institute of Technology",
    "Maharaja Surajmal Institute of Technology",
    "Malvern Preparatory School",
    "Manalapan High School",
    "Manchester Metropolitan University",
    "Manhattan College",
    "Manhattan High School",
    "Manipal Institute of Technology",
    "Marc Garneau Collegiate Institute",
    "Marcellus High School",
    "Marianopolis College",
    "Marist College",
    "Markham District High School",
    "Markville Secondary School",
    "Marlboro High School",
    "Marquette University",
    "Marshall High School",
    "Marymount University",
    "Masaryk University",
    "Massachusetts Institute of Technology",
    "Mater Academy High School",
    "Maulana Abul Kalam Azad University of Technology",
    "Maulana Azad National Institute of Technology",
    "Maulana Azad National Institute of Technology Bhopal",
    "Maumee Valley Country Day School",
    "McGill University",
    "McMaster University",
    "Medical University of Silesia",
    "Menlo School",
    "Mercer County Community College",
    "Mercer University",
    "Meredith College",
    "Messiah College",
    "Metas Adventist School",
    "Metropolitan State University",
    "Metuchen High School",
    "Miami Dade College",
    "Miami Lakes Educational Center",
    "Miami University",
    "Michigan State University",
    "Michigan Technological University",
    "Middle Tennessee State University",
    "Middlebury College",
    "Middlesex County College",
    "Middlesex University",
    "Middletown High School South",
    "Midwood",
    "Miles College",
    "Millburn High School",
    "Millburn Middle School",
    "Millville Senior High School",
    "Milwaukee School of Engineering",
    "Mission College Boulevard",
    "Mission San Jose High School",
    "Mississippi State University",
    "Mississippi University for Women",
    "Missouri State University",
    "Mohammed V University",
    "Molloy College",
    "Monmouth College",
    "Monmouth University",
    "Monroe Community College",
    "Monta Vista High School",
    "Montana State University",
    "Montclair State University",
    "Montgomery Blair High School",
    "Montgomery College",
    "Montgomery County Community College",
    "Montgomery High School",
    "Montville Township High School",
    "Moore Middle School",
    "Moorestown High School",
    "Moraine Valley Community College",
    "Morgan State University",
    "Morris County School of Technology",
    "Moscow Institute of Physics and Technology",
    "Moscrop Secondary School",
    "Motilal Nehru National Institute of Technology",
    "Motilal Nehru National Institute of Technology Allahabad",
    "Mount Holyoke College",
    "Mt. San Antonio College",
    "Muhlenberg college",
    "Nanyang Technological University",
    "Narsee Monjee College of Commerce and Economics",
    "Nashua High School South",
    "National Institute of Engineering, Mysore",
    "National Institute of Technology Calicut",
    "National Institute of Technology, Jamshedpur",
    "National Institute of Technology, Raipur",
    "National Institute of Technology, Silchar",
    "National Institute of Technology, Srinagar",
    "National Institute of Technology, Tiruchirappalli",
    "National Institute of Technology, Warangal",
    "National Research University Higher School Of Economics",
    "Netaji Subhas Institute Of Technology",
    "Netaji Subhash Engineering College",
    "New Albany High School",
    "New Jersey City University",
    "New Jersey Institute of Technology",
    "New Providence High School",
    "New River Community College",
    "New York City College of Technology, CUNY",
    "New York Institute of Technology",
    "New York University",
    "New York University Abu Dhabi",
    "Newcastle University",
    "Newton South High School",
    "Niagara College",
    "Nipissing University",
    "Nirma University",
    "Noakhali Science and Technology University",
    "North American University",
    "North Andover High School",
    "North Brunswick Township High School",
    "North Carolina School of Science and Mathematics",
    "North Carolina State University",
    "North Dakota State University",
    "North Hunterdon High School",
    "North Park Secondary School",
    "North Shore Community College",
    "Northeastern University",
    "Northern Arizona University",
    "Northern Illinois University",
    "Northern Kentucky University",
    "Northern Michigan University",
    "Northern Secondary School",
    "Northern Virginia Community College",
    "Northview High School",
    "Northwest Missouri State University",
    "Northwest Vista College",
    "Northwestern Oklahoma State University",
    "Northwestern University",
    "Nottingham Trent University",
    "Novi High School",
    "Oakland Community College",
    "Oakland University",
    "Ocean City High School",
    "Ocean County College",
    "Ohio Christian University",
    "Okemos High School",
    "Oklahoma State University",
    "Onondaga Community College",
    "Opolska University of Technology",
    "Oregon State University",
    "Otterbein University",
    "Oxford Academy High School",
    "Palo Alto High School",
    "Palomar College",
    "Pandit Deendayal Petroleum University",
    "Paramount International School",
    "Parkview High School",
    "Parsippany High School",
    "Parsons School of Design",
    "Parul Institute of Engineering & Technology",
    "Pasadena City College",
    "Pascal English School, Cyprus",
    "Penncrest High School",
    "Piedmont High School",
    "Pierre Elliott Trudeau High School",
    "Pingree School",
    "Piscataway Township High School",
    "Pittsburgh Technical Institute",
    "Plano East Senior High School",
    "Plovdiv Medical University",
    "Pokhara University",
    "Polsko-Japońska Akademia Technik Komputerowych",
    "Poolesville High School",
    "Poornima College of Engineering",
    "Pope John Paul II High School",
    "Port Credit Secondary School",
    "Porter-Gaud School",
    "Portland State University",
    "Poznań University of Technology",
    "Presidency School, Surat.",
    "Preston High School",
    "Princeton High School",
    "Princeton University",
    "Purdue University",
    "Queen Mary University of London",
    "Queen's University",
    "R.V. College Of Engineering",
    "Radnor High School",
    "Raksha Shakti University",
    "Ramapo College of New Jersey",
    "Ramapo High School",
    "Rani Laxmi Bai Public School",
    "Raritan Valley Community College",
    "Ravenscroft School",
    "Ravenwood High School",
    "Red Bank Regional High School",
    "Regis High School",
    "Rensselaer Polytechnic Institute",
    "Rhode Island College",
    "Rhode Island School of Design",
    "Rhodes College",
    "Rice University",
    "Richard Montgomery High School",
    "Richard Stockton University",
    "Richardson High School",
    "Richland College",
    "Richmond Hill High School",
    "Rider University",
    "Ridgewood High School",
    "River Dell High School",
    "Robert Gordon University",
    "Rochester Institute of Technology",
    "Rock Ridge High School",
    "Roosevelt High School",
    "Rosa Parks Middle School",
    "Rose-Hulman Institute of Technology",
    "Rowan College at Gloucester County",
    "Rowan University",
    "Roxbury High School",
    "Rudbecksgymnasiet",
    "Rutgers, The State University of New Jersey",
    "Ryde School",
    "Ryerson University",
    "SOAS University of London",
    "SUNY Polytechnic Institute",
    "SUPINFO International University",
    "Saginaw Valley State University",
    "Sahrdaya College of Engineering and Technology",
    "Saint Joseph High School",
    "Saint Joseph's College of Maine",
    "Saint Paul College",
    "Saint Peter's Preparatory School",
    "Saint Peter's University",
    "San Diego State University",
    "San Francisco State University",
    "San Jose State University",
    "San Marcos High School",
    "San Marin High School",
    "San Mateo High School",
    "Sant Longowal Institute of Engineering and Technology",
    "Santa Clara University",
    "Santa Margarita Catholic High School",
    "Santa Rosa Junior College",
    "Saratoga High School",
    "Sardar Patel University",
    "Sardar Vallabhbhai National Institute of Technology, Surat",
    "Sarvajanik College of Engineering & Technology",
    "Saurashtra University Rajkot",
    "Savitribai Phule Pune University",
    "School of Visual Arts, New York",
    "Seneca College",
    "Seton Hall University",
    "Seven Lakes High School",
    "Seventh Day Adventist High School",
    "Shaker High School",
    "Shankersinh Vaghela Bapu Institute of Technology",
    "Sheffield Hallam University",
    "Shelton High School",
    "Sherwood Convent School",
    "Sherwood High School",
    "Shiv Nadar University",
    "Shri Govindram Seksaria Institute of Technology and Science",
    "Shri Guru Ram Rai Public School",
    "Shri Vaishnav Institute of Technology and Science",
    "Siena College",
    "Silesian University of Technology",
    "Silver Oak College of Engineering & Technology",
    "Simmons College",
    "Simon Fraser University",
    "Simpson College",
    "Simón Bolívar University",
    "Singapore University of Technology and Design",
    "Sir Padampat Singhania University",
    "Sitarambhai Naranji Patel Institute of Technology & Research Centre",
    "Skidmore College",
    "Slippery Rock University of Pennsylvania",
    "Smith College",
    "South Brunswick High School",
    "South Carolina State University",
    "South Dakota School of Mines and Technology",
    "South Lakes High School",
    "Southeastern Louisiana University",
    "Southern Connecticut State University",
    "Southern Illinois University Carbondale",
    "Southern Illinois University Edwardsville",
    "Southern Methodist University",
    "Spotswood High School",
    "Spring Arbor University",
    "Sreenidhi Institute of Science & Technology",
    "Sri Sivasubramaniya Nadar College of Engineering",
    "St Brendan High School",
    "St Edwards University",
    "St Mary's CE High School – Cheshunt",
    "St Mary's Catholic High School – Croydon",
    "St Paul's Catholic College – Sunbury-on-Thames",
    "St. Cloud State University",
    "St. John's University, New York",
    "St. Mark's School, Hong Kong",
    "St. Mary's Ryken High School",
    "St. Michael College of Engineering & Technology",
    "St. Raymond High School for Boys And Girls",
    "St. Theresa of Lisieux Catholic High School",
    "St. Xavier's Senior Secondary School, Jaipur",
    "St.Mary's Convent School",
    "Stanford University",
    "Staten Island Technical High School",
    "Stephen F. Austin State University",
    "Stetson University",
    "Stevens Institute of Technology",
    "Stevenson University",
    "Stockton University",
    "Stonehill College",
    "Stonewall Jackson High School",
    "Stony Brook University, SUNY",
    "Stuyvesant High School",
    "Sulphur High School",
    "Susquehanna University",
    "Sussex County Community College",
    "Swansea University",
    "Swarthmore College",
    "Symbiosis International University",
    "Syracuse University",
    "Tadeusz Kościuszko University of Technology",
    "Technische Universitaet München",
    "Techno India College of Technology",
    "Techno India University",
    "Tecnológico de Estudio Superiores de Ixtapaluca",
    "Tecnológico de Estudios Superiores de Ecatepec",
    "Temple University",
    "Tenafly High School",
    "Texas A&M University",
    "Texas A&M University – Central Texas",
    "Texas A&M University – Corpus Christi",
    "Texas A&M University – Kingsville",
    "Texas Christian University",
    "Texas Southern University",
    "Texas Southmost College",
    "Texas State University",
    "Texas Tech University",
    "Thakur College of Engineering and Technology",
    "The British University In Egypt",
    "The Bronx High School of Science",
    "The City College of New York, CUNY",
    "The College Of William & Mary",
    "The College at Brockport, SUNY",
    "The College of New Jersey",
    "The College of Saint Rose",
    "The George Washington University",
    "The Harker School",
    "The Hill School",
    "The Katholieke Universiteit Leuven",
    "The LNM Institute of Information Technology",
    "The Maharaja Sayajirao University of Baroda",
    "The Mount Tabor Training College",
    "The Ohio State University",
    "The Open University",
    "The Pennsylvania State University",
    "The Pennsylvania State University – Abington Campus",
    "The Pennsylvania State University – Harrisburg",
    "The Pennsylvania State University – York Campus",
    "The Pennsylvania State University – Berks",
    "The Roxbury Latin School",
    "The SRM University",
    "The Savannah College of Art and Design",
    "The Technical University of Denmark",
    "The Technische Universität Berlin",
    "The University of Akron",
    "The University of Alabama",
    "The University of Alberta",
    "The University of Applied Sciences Upper Austria",
    "The University of Arizona",
    "The University of Arkansas",
    "The University of Bath",
    "The University of Bedfordshire",
    "The University of Birmingham",
    "The University of Bolton",
    "The University of Bonn",
    "The University of Bristol",
    "The University of British Columbia",
    "The University of Calgary",
    "The University of Calicut",
    "The University of California, Berkeley",
    "The University of California, Davis",
    "The University of California, Irvine",
    "The University of California, Los Angeles",
    "The University of California, Riverside",
    "The University of California, San Diego",
    "The University of California, Santa Barbara",
    "The University of California, Merced",
    "The University of California, Santa Cruz",
    "The University of Cambridge",
    "The University of Central Florida",
    "The University of Cincinnati",
    "The University of Colorado Boulder",
    "The University of Colorado Colorado Springs",
    "The University of Connecticut",
    "The University of Dallas",
    "The University of Delaware",
    "The University of Denver",
    "The University of Derby",
    "The University of Dundee",
    "The University of Edinburgh",
    "The University of Essex",
    "The University of Evansville",
    "The University of Exeter",
    "The University of Falmouth",
    "The University of Florida",
    "The University of Gdańsk",
    "The University of Georgia",
    "The University of Glasgow",
    "The University of Groningen",
    "The University of Guelph",
    "The University of Houston",
    "The University of Houston – Clear Lake",
    "The University of Houston – Downtown",
    "The University of Huddersfield",
    "The University of Idaho",
    "The University of Illinois at Chicago",
    "The University of Illinois at Urbana-Champaign",
    "The University of Information Technology and Management in Rzeszow",
    "The University of Iowa",
    "The University of Kansas",
    "The University of Kent",
    "The University of Kentucky",
    "The University of La Verne",
    "The University of Leeds",
    "The University of Leicester",
    "The University of Lincoln",
    "The University of Liverpool",
    "The University of Ljubljana",
    "The University of Louisiana at Lafayette",
    "The University of Louisiana at Monroe",
    "The University of Louisville",
    "The University of Manchester",
    "The University of Manitoba",
    "The University of Maryland, Baltimore County",
    "The University of Maryland, College Park",
    "The University of Massachusetts Amherst",
    "The University of Massachusetts Boston",
    "The University of Massachusetts Dartmouth",
    "The University of Massachusetts Lowell",
    "The University of Miami",
    "The University of Michigan",
    "The University of Minnesota",
    "The University of Missouri",
    "The University of Missouri-Kansas City",
    "The University of Málaga",
    "The University of Nebraska-Lincoln",
    "The University of New Brunswick",
    "The University of New Hampshire",
    "The University of New Haven",
    "The University of North Carolina at Chapel Hill",
    "The University of North Carolina at Charlotte",
    "The University of North Carolina at Greensboro",
    "The University of North Texas",
    "The University of Northampton",
    "The University of Notre Dame",
    "The University of Nottingham",
    "The University of Oklahoma",
    "The University of Ontario Institute of Technology",
    "The University of Oregon",
    "The University of Ottawa",
    "The University of Oulu",
    "The University of Oxford",
    "The University of Pennsylvania",
    "The University of Petroleum and Energy Studies",
    "The University of Phoenix",
    "The University of Pittsburgh",
    "The University of Portland",
    "The University of Portsmouth",
    "The University of Puerto Rico, Mayagüez Campus",
    "The University of Puerto Rico, Río Piedras Campus",
    "The University of Richmond",
    "The University of Rochester",
    "The University of Salford",
    "The University of San Francisco",
    "The University of Sharjah",
    "The University of Sheffield",
    "The University of Silesia in Katowice",
    "The University of South Carolina",
    "The University of South Florida",
    "The University of Southampton",
    "The University of Southern California",
    "The University of Southern Denmark",
    "The University of St Andrews",
    "The University of St. Gallen",
    "The University of St. Thomas",
    "The University of Stirling",
    "The University of Strathclyde",
    "The University of Stuttgart",
    "The University of Surrey",
    "The University of Sussex",
    "The University of Tampa",
    "The University of Tennessee",
    "The University of Texas Rio Grande Valley",
    "The University of Texas at Arlington",
    "The University of Texas at Austin",
    "The University of Texas at Dallas",
    "The University of Texas at El Paso",
    "The University of Texas at San Antonio",
    "The University of Texas of the Permian Basin",
    "The University of Texas – Pan American",
    "The University of Toledo",
    "The University of Toronto",
    "The University of Toronto Scarborough",
    "The University of Toronto Mississauga",
    "The University of Tulsa",
    "The University of Utah",
    "The University of Vermont",
    "The University of Victoria",
    "The University of Warsaw",
    "The University of Warwick",
    "The University of Washington",
    "The University of Waterloo",
    "The University of West Georgia",
    "The University of Western Ontario",
    "The University of Westminster",
    "The University of Windsor",
    "The University of Wisconsin-Eau Claire",
    "The University of Wisconsin-Green Bay",
    "The University of Wisconsin-La Crosse",
    "The University of Wisconsin-Madison",
    "The University of Wisconsin-Milwaukee",
    "The University of Wisconsin-Oshkosh",
    "The University of Wisconsin-Parkside",
    "The University of Wisconsin-Platteville",
    "The University of Wisconsin-River Falls",
    "The University of Wisconsin-Stevens Point",
    "The University of Wisconsin-Stout",
    "The University of Wisconsin-Superior",
    "The University of Wisconsin-Whitewater",
    "The University of Wolverhampton",
    "The University of Wrocław",
    "The University of York",
    "The University of Zagreb",
    "The University of the Pacific",
    "The Université de Sherbrooke",
    "Thomas Edison State College",
    "Thomas Jefferson High School for Science and Technology",
    "Thomas Nelson Community College",
    "Thomas S. Wootton High School",
    "Tongji University",
    "Towson University",
    "Trent University",
    "Trinity College",
    "Trinity Valley School",
    "Troy Athens High School",
    "Troy High School",
    "Troy University",
    "Tshwane University of Technology",
    "Tufts University",
    "Tulane University",
    "Tunis El Manar University",
    "Turner Fenton Secondary School",
    "UNAM FES Aragón",
    "Ulster University",
    "Union County College",
    "Union County Magnet High School",
    "Union County Vocational-Technical Schools",
    "Unionville High School",
    "United College of Engineering and Research",
    "United Institute of Technology",
    "Universidad Autónoma Metropolitana",
    "Universidad Autónoma de Coahuila",
    "Universidad Autónoma de Nuevo León",
    "Universidad Autónoma de San Luis Potosí",
    "Universidad Autónoma de Tlaxcala",
    "Universidad Autónoma del Estado de Morelos",
    "Universidad Autónoma del Estado de México",
    "Universidad Autónoma del Perú",
    "Universidad Centro de Estudios Cortazar",
    "Universidad Iberoamericana",
    "Universidad Nacional Autónoma de México",
    "Universidad Panamericana",
    "Universidad Politécnica de Guanajuato",
    "Universidad Politécnica de Querétaro",
    "Universidad TecMilenio",
    "Universidad Tecnológica de México",
    "Universidad Tecnológica de Puebla",
    "Universidad Veracruzana",
    "Universidad de Guadalajara",
    "Universidad de Guanajuato",
    "Universidad de La Salle Bajío",
    "Universidad de Monterrey",
    "Universidad del Desarrollo",
    "Universidad del Valle de México",
    "Universitat Politècnica de Catalunya, UPC",
    "Universitat Autònoma de Barcelona, UAB",
    "Universitat de Barcelona",
    "Universidad en Línea, Mexico",
    "Universitat Politècnica de Catalunya",
    "Universitat Pompeu Fabra",
    "University Campus Suffolk",
    "University College London",
    "University at Albany, SUNY",
    "University at Binghamton, SUNY",
    "University at Buffalo, SUNY",
    "University at New Paltz, SUNY",
    "University at Orange, SUNY",
    "University at Oswego, SUNY",
    "University at Plattsburgh, SUNY",
    "University of Białystok",
    "University of Cincinnati Clermont College",
    "University of Udaipur",
    "University of the People",
    "Université du Québec à Montréal",
    "Upper Canada College",
    "Upper Iowa University",
    "Urbana High School",
    "Ursinus College",
    "Utah State University",
    "Utica College",
    "Utkal University",
    "Uttar Pradesh Technical University",
    "Uttaranchal Institute of Technology",
    "VIA University College",
    "VIT University",
    "Vadodara Institute of Engineering",
    "Valley Christian High School",
    "Valley High School",
    "Vanderbilt University",
    "Vanier College",
    "Vassar College",
    "Veer Narmad South Gujarat University",
    "Veer Surendra Sai University of Technology, Burla",
    "Vellore Institute of Technology",
    "Veterans Memorial Early College High School",
    "Victoria Park Collegiate Institute",
    "Vidyakunj International School",
    "Villanova University",
    "Vincennes University",
    "Vincent Massey Secondary School",
    "Virginia Commonwealth University",
    "Virginia Tech",
    "Visvesvaraya National Institute of Technology",
    "Visvesvaraya Technological University",
    "Vivekanand Education Society's Institute of Technology",
    "Vivekananda College for BCA",
    "Wake Forest University",
    "Walt Whitman High School",
    "Ward Melville High School",
    "Warsaw School of Economics",
    "Warsaw University of Technology",
    "Wartburg College",
    "Washington State University",
    "Washington Township High School",
    "Washington University in St. Louis",
    "Wayne State University",
    "Webb Bridge Middle School",
    "Wellesley College",
    "Wentworth Institute of Technology",
    "Wesleyan University",
    "West Chester University",
    "West Morris Mendham High School",
    "West Potomac High School",
    "West Windsor-Plainsboro High School South",
    "Western Governors University",
    "Western Kentucky University",
    "Western Michigan University",
    "Western New England University",
    "Western University",
    "Western Washington University",
    "Westfield High School",
    "Westminster College",
    "Westminster School",
    "Westwood High School",
    "Wichita State University",
    "Wilfrid Laurier University",
    "Wilkes University",
    "William Lyon Mackenzie Collegiate Institute",
    "William Paterson University",
    "Williams College",
    "Wilmington University",
    "Winona State University",
    "Winston Churchill High School",
    "Winthrop University",
    "Woodbridge High School",
    "Worcester Polytechnic Institute",
    "Worcester State University",
    "Wright State University",
    "Wrocław University of Economics",
    "Wrocław University of Technology",
    "Wyższa Szkoła Biznesu – National-Louis University",
    "Xavier University",
    "YMCA University of Science & Technology",
    "Yale University",
    "Yale-NUS College",
    "York College of Pennsylvania",
    "York University",
    "Youngstown State University",
    "Zespół Szkół Nr.2 im. Jana Pawła II w Miechowie",
    "Zespół Szkół nr 1 im. Jana Pawła II w Przysusze",
    "Zespół Szkół Łączności, Monte Cassino 31",
    "Zespół szkół nr 1 im. Stanisława Staszica w Bochni",
    "Zespół Szkół im. Jana Pawła II w Niepołomicach",
    "École Centrale Paris",
    "École Polytechnique de Montréal",
    "École de technologie supérieure",
    "The University of Chicago",
    "Appalachian State University",
    "Eidgenössische Technische Hochschule (ETH) Zürich",
    "Hunter College, CUNY",
    "School of Professional Studies, CUNY",
    "John Jay College of Criminal Justice, CUNY",
    "York College, CUNY",
    "Lehman College, CUNY",
    "Borough of Manhattan Community College, CUNY",
    "Kingsborough Community College, CUNY",
    "Bronx Community College, CUNY",
    "LaGuardia Community College, CUNY",
    "Guttman Community College, CUNY",
    "Queensborough Community College, CUNY",
    "Hostos Community College, CUNY",
    "Potsdam, SUNY",
    "University of Southampton",
    "Florida Agricultural & Mechanical (A&M) University",
    "Truman State University",
    "EPFL | École polytechnique fédérale de Lausanne",
    "Santa Barbara City College",
    "TU/e Technische Universiteit Eindhoven University of Technology",
    "Berea College",
    "Delft University of Technology",
    "De Anza College",
    "Queens College, CUNY",
    "Yeshiva University",
    "Instituto Tecnólogico de La Laguna (ITL)",
    "Bryn Mawr College",
    "Instituto Tecnológico y de Estudios Superiores de Occidente (ITESO)",
    "Salem State University",
    "Hood College",
    "Brno University of Technology",
    "Tacoma Community College",
    "University of Pikeville",
    "Slovak University of Technology in Bratislava (STU)",
    "South Texas College",
    "Instituto Tecnológico Superior de los Ríos",
    "Cardiff Metropolitan University",
    "Loyola Marymount University",
    "LIM College",
    "University of North America",
    "Université de Mons",
    "Instituto Tecnológico Superior de El Mante",
    "Glenbrook South High School",
    "Eastern Washington University",
    "Canada (Cañada) College",
    "Barton College",
    "Bergen County Technical High School - Teterboro",
    "Trinity International University",
    "Davidson College",
    "The University of the South - Sewanee",
    "Norco College",
    "Universidad Interamericana de Puerto Rico",
    "Maine South High School",
    "American High School",
    "Chantilly High School",
    "Oakton High School",
    "Other",
  ];

  // user
  const [user, setUser] = useState<User | null>(null);
  const [coinsID, setCoinsID] = useState("");
    const [verifyReferral, setVerifyReferral] = useState(false);

  useEffect(() => {
    setUser(FIREBASE_AUTH.currentUser);
  }, []);

    // loading
    const [loading, setLoading] = useState(false);

    // dietary restrictions
    const [dietary, setDietary] = useState("");
    const [otherDietary,setOtherDietary] = useState("");
    const [otherDietaryRestriction, setOtherDietaryRestriction] = useState('');
    const [otherDietaryRestrictionCheck, setOtherDietaryRestrictionCheck] = useState(false);

  // year
  const [selectYear, setSelectYear] = useState("Select");
  const [otherYear, setOtherYear] = useState("");
  const [otherSelectYearCheck, setOtherSelectYearCheck] = useState("");

  // school
  const [schools, setSchools] = useState([]);
  // resume upload
  const [resumeName, setResumeName] = useState("");
  const [uploadResume, setUploadResume] = useState<UploadTask | null>(null);
  const [isResumePicked, setIsResumePicked] = useState(false);
  const [progress, setProgress] = useState(0);

  const changeResumeHandle = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      multiple: false,
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      return;
    }

    const r = await fetch(result.assets[0].uri);
    const b = await r.blob();

    const storageReference = storageRef(
      FIREBASE_STORAGE,
      `/resume/${selectYear}/${result.assets[0].name}`
    );
    const uploadResumeToDB = uploadBytesResumable(storageReference, b);

    uploadResumeToDB.on("state_changed", (snapshot) => {
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setUploadResume(uploadResumeToDB);
    });

    setResumeName(result.assets[0].name);
    setIsResumePicked(true);
  };
  // Add a function to check whether all required fields are filled
const areRequiredFieldsFilled = () => {
  // Add conditions for all required fields
  return (
      gender !== "" &&
      race !== "" &&
      school !== "" &&
      selectYear !== "" &&
      describe !== "" &&
      major !== "" &&
      numHackathons !== "" &&
      reason !== "" &&
      mlhPrivacyAndTermsNCondition &&
      mlhCodeofConduct &&
      mlhAdvertisement
  );

  };

    // add multiple restrictions
    /*
    const selectRestrictions = (event: any) => {

        if (dietaryRestriction.includes(event.target.value)) {
            setDietaryRestriction(current => current.filter(diet => diet !== event.target.value))
        }
        else {
            setDietaryRestriction(current => [...current, event.target.value]);
        }

    };*/


    const apply = async () => { 
        const finalSchool = school === 'Other' ? otherSchool : school;
        const finalGender = gender === 'Other' ? otherGender : gender;
        const finalRace = race === 'Other' ? otherRace : race;
        const finalYear = selectYear === 'Other' ? otherYear : selectYear;
        const finalDietary = dietary === 'Other' ? otherDietary : dietary;

        if (user == null) {
            return;
        }

        /*
        // update dietary restrictions with other value
        var dietRestriction = dietaryRestriction;
        if (otherDietaryRestriction !== '') {
            dietRestriction.push(otherDietaryRestriction);
        }*/

        // check if refferal id is correct or not
        if (coinsID !== "") {
            await getDoc(doc(FIRESTORE_DB, "users", coinsID))
                .then((docSnapshot) => {
                    setVerifyReferral(docSnapshot.exists);
                })
        }
        
        // checks if resume has been uploaded yet or not
        if (progress === 100 && isResumePicked && uploadResume !== null) {

            // download url
            const url = await getDownloadURL(uploadResume.snapshot.ref);
            
            await setDoc(doc(FIRESTORE_DB, "applications", user.uid), {
                birthdate: birthdate,
                gender: finalGender,
                race: finalRace,
                school: finalSchool,
                describe: describe,
                dietary: finalDietary,
                major: major,
                resume: url,
                numHackathons: numHackathons,
                reason: reason,
                mlhPrivacyAndTermsNCondition: mlhPrivacyAndTermsNCondition,
                mlhCodeofConduct: mlhCodeofConduct,
                mlhAdvertisement: mlhAdvertisement,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            });

        } else {
            await setDoc(doc(FIRESTORE_DB, "applications", user.uid), {
                birthdate: chosenBirthdate,
                gender: finalGender,
                race: finalRace,
                school: finalSchool,
                describe: describe,
                dietary: finalDietary,
                major: major,
                resume: "none",
                numHackathons: numHackathons,
                reason: reason,
                mlhPrivacyAndTermsNCondition: mlhPrivacyAndTermsNCondition,
                mlhCodeofConduct: mlhCodeofConduct,
                mlhAdvertisement: mlhAdvertisement,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            });

        }

        try {
            await runTransaction(FIRESTORE_DB, async (transaction) => {
                const userDoc = await transaction.get(doc(FIRESTORE_DB, "users", user.uid));
                if (!userDoc.exists()) {
                    throw "User does not exist!";
                }
                const newHoocoins = userDoc.data().hoocoins + 5;
                transaction.update(doc(FIRESTORE_DB, "users", user.uid), { hoocoins: newHoocoins });
            });
            console.log("Transaction successfully committed!");
        } catch (e) {
            alert("Transaction failed: " + e);
        }

        if (verifyReferral) {
            try {
                await runTransaction(FIRESTORE_DB, async (transaction) => {
                    const userDoc = await transaction.get(doc(FIRESTORE_DB, "users", coinsID));
                    if (!userDoc.exists()) {
                        throw "User does not exist!";
                    }
                    const newHoocoins = userDoc.data().hoocoins + 5;
                    transaction.update(doc(FIRESTORE_DB, "users", coinsID), { hoocoins: newHoocoins });
                });
                console.log("Transaction successfully committed!");
            } catch (e) {
                alert("Transaction failed: " + e);
            }
        }

    }



  return (
    <View style={styles.webContainer}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.subHeader}>Basic Information</Text>
          <DatePicker
            value={chosenBirthdate}
            onChange={(newDate: any) => setChosenBirthdate(newDate)}
          />

          <Text>
            Gender
            <Text style={styles.required}> *</Text>
          </Text>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
            prompt="Gender"
            style={styles.picker}
          >
            <Picker.Item label="Select" value="Select" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Non-binary" value="non-binary" />
            <Picker.Item label="Transgender" value="transgender" />
            <Picker.Item label="Other" value="Other" />
            <Picker.Item label="Prefer not to say" value="not-say" />
          </Picker>
          {gender === 'Other' && (
        <TextInput
          value={otherGender}
          onChangeText={(text) => setOtherGender(text)}
          placeholder="Enter Other Gender"
          style={styles.input}
        />
      )}

          <Text>
            Race
            <Text style={styles.required}> *</Text>
          </Text>
          <Picker
            selectedValue={race}
            onValueChange={(itemValue, itemIndex) => setRace(itemValue)}
            prompt="Race"
            style={styles.picker}
          >
            <Picker.Item label="Select" value="Select" />
            <Picker.Item label="African American" value="african-american" />
            <Picker.Item label="White" value="white" />
            <Picker.Item label="Asian" value="asian" />
            <Picker.Item label="Hispanic" value="hispanic" />
            <Picker.Item label="Native Hawaiian" value="native-hawaiian" />
            <Picker.Item label="Native American" value="native-american" />
            <Picker.Item label="Other" value="Other" />
            <Picker.Item label="Two or more races" value="two-or-more" />
          </Picker>
          {race === 'Other' && (
        <TextInput
          value={otherRace}
          onChangeText={(text) => setOtherRace(text)}
          placeholder="Enter Other Race"
          style={styles.input}
        />
      )}

          <Text style={styles.subHeader}>Basic Information</Text>

          <Text>
            School
            <Text style={styles.required}> *</Text>
          </Text>
          <Picker
          selectedValue={school}
          onValueChange={(itemValue, itemIndex) => setSchool(itemValue)}
          prompt="School"
          style={styles.picker}
        >
          {schoolNames.map((name) => (
            <Picker.Item value={name} label={name} />
          ))}
        </Picker>
        {school === 'Other' && (
        <TextInput
          value={otherSchool}
          onChangeText={(text) => setOtherSchool(text)}
          placeholder="Enter Other School"
          style={styles.input}
        />
      )}
      
      

          <Text>
            Graduation Year
            <Text style={styles.required}> *</Text>
          </Text>
          <Picker
            selectedValue={selectYear}
            onValueChange={(itemValue, itemIndex) => setSelectYear(itemValue)}
            prompt="Graduation Year"
            style={styles.picker}
          >
            {}
            <Picker.Item label="Select" value="Select" />
            <Picker.Item label="2023" value="2023" />
            <Picker.Item label="2024" value="2024" />
            <Picker.Item label="2025" value="2025" />
            <Picker.Item label="2026" value="2026" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          {selectYear === 'Other' && (
        <TextInput
          value={otherYear}
          onChangeText={(text) => setOtherYear(text)}
          placeholder="Enter Other Graduation Year"
          style={styles.input}
        />
      )}

          <Text>
            Dietary Restrictions
            <Text style={styles.required}> *</Text>
          </Text>
          <Picker
            selectedValue={dietary}
            onValueChange={(itemValue, itemIndex) => setDietary(itemValue)}
            prompt="Dietary"
            style={styles.picker}
          >
            <Picker.Item label="Select" value="Select" />
            <Picker.Item label="Vegetarian" value="Vegetarian" />
            <Picker.Item label="Vegan" value="Vegan" />
            <Picker.Item label="Gluten Free" value="GlutenFree" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          {dietary === 'Other' && (
        <TextInput
          value={otherDietary}
          onChangeText={(text) => setOtherDietary(text)}
          placeholder="Enter Other Dietary Restrictions"
          style={styles.input}
        />
      )}

          <Pressable style={styles.button} onPress={() => changeResumeHandle()}>
            <Text style={styles.button_text}>Optional - Upload Resume</Text>
          </Pressable>

          <Text>
            I would describe myself as a...
            <Text style={styles.required}> *</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Innovator who enjoys..."
            placeholderTextColor="#121A6A"
            autoCapitalize="none"
            onChangeText={(text) => setDescribe(text)}
          />

          <Text>
            Major
            <Text style={styles.required}> *</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Computer Science"
            placeholderTextColor="#121A6A"
            autoCapitalize="none"
            onChangeText={(text) => setMajor(text)}
          />

          <Text>
            How many hackathons have you attended?
            <Text style={styles.required}> *</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="How many hackathons have you attended?"
            placeholderTextColor="#121A6A"
            autoCapitalize="none"
            onChangeText={(text) => setNumHackathons(text)}
          />

          <Text>
            What do you hope to get out of HooHacks?
            <Text style={styles.required}> *</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Interactive workshops, community, ..."
            placeholderTextColor="#121A6A"
            autoCapitalize="none"
            onChangeText={(text) => setReason(text)}
          />
          <Text>
            Did someone tell you to register for HooHacks? If so, enter their
            raffle ID so that they can get an extra coins in our raffle! Their
            raffle ID can be found on the bottom of the dashboard page.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="HooCoins ID"
            placeholderTextColor="#121A6A"
            autoCapitalize="none"
            onChangeText={(text) => setCoinsID(text)}
          />
          <View style={styles.containerCheckBox}>
            <Checkbox
              value={mlhPrivacyAndTermsNCondition}
              onValueChange={() =>
                setMlhPrivacyAndTermsNCondition(!mlhPrivacyAndTermsNCondition)
              }
              color={"#121A6A"}
            />
            <Text>
              I authorize you to share my application/registration information
              with Major League Hacking for event administration, ranking, and
              MLH administration in-line with the
              <Text> </Text>
              <Text
                style={styles.link}
                onPress={() => Linking.openURL("https://mlh.io/privacy")}
              >
                MLH Privacy Policy.
              </Text>
              <Text> </Text>I further agree to the terms of both the
              <Text> </Text>
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions"
                  )
                }
              >
                MLH Contest Terms and Conditions
              </Text>
              <Text> </Text>
              and the
              <Text> </Text>
              <Text
                style={styles.link}
                onPress={() => Linking.openURL("https://mlh.io/privacy")}
              >
                MLH Privacy Policy.
              </Text>
            </Text>
          </View>
          <View style={styles.containerCheckBox}>
            <Checkbox
              value={mlhCodeofConduct}
              onValueChange={() => setMlhCodeofConduct(!mlhCodeofConduct)}
              color={"#121A6A"}
            />
            <Text>
              I have read and agree to the
              <Text> </Text>
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL(
                    "https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                  )
                }
              >
                MLH Code of Conduct.
              </Text>
            </Text>
          </View>
          <View style={styles.containerCheckBox}>
            <Checkbox
              value={mlhAdvertisement}
              onValueChange={() => setMlhAdvertisement(!mlhAdvertisement)}
              color={"#121A6A"}
            />
            <Text>
              I authorize MLH to send me pre- and post-event informational
              emails, which contain free credit and opportunities from their
              partners.
            </Text>
          </View>
          {loading ? (
            /* Disable the Apply button if required fields are not filled */
            <ActivityIndicator size="large" color="#121A6A" />
          ) : (
            <>
              <Pressable style={[styles.button, areRequiredFieldsFilled() ? null : { opacity: 0.5 }]} onPress={() => areRequiredFieldsFilled() && apply()} disabled={!areRequiredFieldsFilled()}>
                <Text style={styles.button_text}>Apply</Text>
              </Pressable>
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Application;