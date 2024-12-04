declare global {
    interface Window {
      managePermission:(DocumentLibraryName:string,SiteTilte:string , SiteID:string, folderName:any ,folderPath:any) => void;
      manageWorkflow:(DocumentLibraryName:string,SiteTilte:string , SiteID:string) => void;
      view:(message:string) => void;
      PreviewFile: (path: string, siteID: string, docLibName:any,  filemasterlist:any , filepreview:any) => void;
      Download: (path: string, siteID: string, docLibName:any,  filemasterlist:any , filepreview:any) => void;
      deleteFile:(fileId: string , siteID:string, IsHardDelete:any, listToUpdate:any ) => void;
      shareFile:(fileID:string,siteId:string,currentFolderPathForFile:string,fileName:string,flag:string,FileVersion:any,FileSize:any,Status:any,FilePreviewURL:any,DocumentLibraryName:any)=> void;
      editFile:(siteName: string, documentLibraryName:string )=> void;
      documentLibraryPopUp:(fileId: string , siteID:any , FolderPath:any , FileName:any,permission:any)=>void;
      undo:(fileId:any,siteId:any,FileMasterList:any,documentLibraryName:any,ID:any,folderPath:any,fileName:any)=>void;
      confirmUndo:(fileId:any, siteId:any, FileMasterList:any, documentLibraryName:any, ID:any,folderPath:any,fileName:any) =>void;
    }

  }

      // props for Manage work flow
// props for Manage work flow
const propsForManageWorkFlow={
  SiteTitle:"",
  DocumentLibraryName:"",
  SiteID:""
}
// props for managePermission
const managePermissionProps={
  SiteTitle:"",
  DocumentLibraryName:"",
  SiteID:"",
  FolderName: "",
  FolderPath:""
}
  interface UploadFileProps {
    currentfolderpath: {
      CurrentEntity: string;
      currentEntityURL: string;
      currentsiteID: string;
      // ... other properties
    };
  }
  // export interface IDmsMusaibProps {
  //   description: string;
  //   isDarkTheme: boolean;
  //   environmentMessage: string;
  //   hasTeamsContext: boolean;
  //   userDisplayName: string;
  //   context: any;
  //   siteUrl: string;
  // }
  
  // @ts-ignore
  import * as React from "react";
  import { getSP } from "../loc/pnpjsConfig";
  import { SPFI } from "@pnp/sp";
  import "bootstrap/dist/css/bootstrap.min.css";
  // import "bootstrap//dist/"
  import "../../../CustomCss/mainCustom.scss";
  import "../../verticalSideBar/components/VerticalSidebar.scss";
  import VerticalSideBar from "../../verticalSideBar/components/VerticalSideBar";
  import UserContext from "../../../GlobalContext/context";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {  
    faUser, 
    faShareAlt, 
    faListSquares,
    faTableCells,
    faList
    // faTrash, 
    // faEdit, 
    // faEye  
  } from "@fortawesome/free-solid-svg-icons";
  import {
    faStar as faStarRegular,
    faFolder as faFolderRegular,
  
  } from "@fortawesome/free-regular-svg-icons";
  // import { useState , useEffect } from "react";
  import Provider from "../../../GlobalContext/provider";
  import { useMediaQuery } from "react-responsive";
  import "@pnp/sp/webs";
  import "@pnp/sp/folders";
  import "@pnp/sp/files";
  import "@pnp/sp/sites"
  import "@pnp/sp/presets/all"
  import "@pnp/sp/webs";
  import "@pnp/sp/sites";
  import "@pnp/sp/site-users/web";
  import { PermissionKind } from "@pnp/sp/security";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "../../../CustomCss/mainCustom.scss";
  import "../../verticalSideBar/components/VerticalSidebar.scss";
  import "./DMSMaincss";
  import { useState , useRef , useEffect} from "react";
  import UploadFile from "./UploadFile";
  import CreateFolder from "./CreateFolder";
  import Table from "./Table";
  import { IFileInfo } from "@pnp/sp/files";
  import { Popup } from "@fluentui/react";
  
  
  import {IDmsMusaibProps} from './IDmsMusaibProps'
  import HorizontalNavbar from "../../horizontalNavBar/components/HorizontalNavBar";
import ManageWorkFlow from "./ManageWorkFlow";
import ManageFolderPermission from "./ManageFolderPermission";
import { folderFromPath } from "@pnp/sp/folders";
import Swal from "sweetalert2";
let Undo = require('../assets/Undo.svg');
  let sharewithmeicon = require('../assets/nodes.png')
  let recyclebin = require('../assets/recycle-bin.png')
  let sharewithothericon = require('../assets/share.png')
  let starticon = require('../assets/star.png')
  let listicon = require('../assets/list.png')
  let downloadicon = require('../assets/download.png')
   let foldericon = require('../assets/foldericon.png')
  let Docicon = require("../assets/DOC.png");
  let Txticon = require("../assets/TXT.png");
  let Pdficon = require("../assets/PDF.png");
  let Xlsicon = require("../assets/XLS.png");
  let Zipicon = require("../assets/ZIP.png");
  let MainRounteVariable = 'MyRequest'
 
  let managePermissionIcon =  require('../assets/ManagePermission.svg') 
  // import managePermissionIcon from '../assets/ManagePermission.svg';
  let manageWorkFlowIcon =  require('../assets/ManageWorkflow.svg')
  // import manageWorkFlowIcon from '../assets/ManageWorkflow.svg';
  let viewIcon =  require('../assets/View.svg')
  // import viewIcon from '../assets/View.svg';
  let editIcon =  require('../assets/Edit.svg')
  // import editIcon from '../assets/Edit.svg';
  let deleteIcon =  require('../assets/Delete.svg')
  // import deleteIcon from '../assets/Delete.svg';
  let FillFavouriteFile = require('../assets/FillFavourite.svg')
  let ShareFile = require('../assets/Edit.svg')
  let UnFillFavouriteFile = require('../assets/UnFillFavourite.svg')
  let myfolderdata:any = []
  
  let currentDocumentLibrary = "";
  let currentFolder           = ""
  let currentfolderpath = "";
  // @ts-ignore
   let parentfolder            = ""
  let currentDevision = "";
    // @ts-ignore
  let currentDepartment       = ""
  let currentEntityURL = "";
    // @ts-ignore
  let currentEntity = ""
  let currentsiteID = ""
  let iscontribute = "" 
  let isadmin = ""
  let mydatacard = ""
  let mydata: string[] = [];
  
  // start
  // let searchArray:any=[];
  let routeToDiffSideBar="";
  // end
  
  
  
  const ArgPoc = ({ props }: any) => {
    const sp: SPFI = getSP();
    // console.log(sp, "sp");
    const [showDeletepopup, setShowDeletepopup] = useState(false);
   const [activeButton] = React.useState<string>("");
    const { useHide }: any = React.useContext(UserContext);
    const elementRef = React.useRef<HTMLDivElement>(null);
    const [showFirstDiv, setShowFirstDiv] = useState(true);
    const [showworkflowdiv, setshowworkflowdiv] = useState('');
    const [showWorkflow, setShowWorkflow] = useState(false);
    const [showfolderpermission, setShowfolderpermission] = useState(false);
    let cleanUrlInMyRequest=false;
    // const handleButtonClickShow = () => {
    //   setShowFirstDiv(false);
    // };
  
  
    React.useEffect(() => {
      // console.log("This function is called only once", useHide);
  
      const showNavbar = (
        toggleId: string,
        navId: string,
        bodyId: string,
        headerId: string
      ) => {
        const toggle = document.getElementById(toggleId);
        const nav = document.getElementById(navId);
        const bodypd = document.getElementById(bodyId);
        const headerpd = document.getElementById(headerId);
  
        if (toggle && nav && bodypd && headerpd) {
          toggle.addEventListener("click", () => {
            nav.classList.toggle("show");
            toggle.classList.toggle("bx-x");
            bodypd.classList.toggle("body-pd");
            headerpd.classList.toggle("body-pd");
          });
        }
      };
  
      showNavbar("header-toggle", "nav-bar", "body-pd", "header");
  
      const linkColor = document.querySelectorAll(".nav_link");
  
      function colorLink(this: HTMLElement) {
        if (linkColor) {
          linkColor.forEach((l) => l.classList.remove("active"));
          this.classList.add("active");
        }
      }
  
      linkColor.forEach((l) => l.addEventListener("click", colorLink));
    }, [useHide]);
    // Media query to check if the screen width is less than 768px
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  
    React.useEffect(() => {
      // console.log("This function is called only once", useHide);
  
      const showNavbar = (
        toggleId: string,
        navId: string,
        bodyId: string,
        headerId: string
      ) => {
        const toggle = document.getElementById(toggleId);
        const nav = document.getElementById(navId);
        const bodypd = document.getElementById(bodyId);
        const headerpd = document.getElementById(headerId);
  
        if (toggle && nav && bodypd && headerpd) {
          toggle.addEventListener("click", () => {
            nav.classList.toggle("show");
            toggle.classList.toggle("bx-x");
            bodypd.classList.toggle("body-pd");
            headerpd.classList.toggle("body-pd");
          });
        }
      };
  
      showNavbar("header-toggle", "nav-bar", "body-pd", "header");
  
      const linkColor = document.querySelectorAll(".nav_link");
  
      function colorLink(this: HTMLElement) {
        if (linkColor) {
          linkColor.forEach((l) => l.classList.remove("active"));
          this.classList.add("active");
        }
      }
  
      linkColor.forEach((l) => l.addEventListener("click", colorLink));
    }, [useHide]);
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
        }
      };
  
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }, []);


    // code to route to different document library and folder start
  useEffect(() => {
    // const params = new URLSearchParams(window.location.search);
    const url = window.location.href;
    // const matches = url.match(/\/([^\/]+)\.aspx/);
    let extractedPart = url.split('.aspx')[1]; 
    let parameters = extractedPart.split('?')
    // alert( parameters);
    console.log("parameters",parameters);
    let path="";
    let siteId="";
    let folderName="";
    let devision="";
    let department="";
    if(parameters.length>1){
    parameters.forEach((items,index)=>{
      console.log(`items[${index}]`,items)

      if(index ==1){
        if(items.includes('%20')){
          console.log("Clean Url")
          const cleanUrl = items.replace(/%20/g, ' '); 
          path=cleanUrl;
        }else{
          path=items;
        } 
        
      }
      if(index ==2){
        if(items.includes('%20')){
          console.log("Clean path")
          const cleanUrl = items.replace(/%20/g, ' '); 
          folderName=cleanUrl;
        }else{
          folderName=items;
        } 
        // folderName=items;
      }
      if(index ==3){
        siteId=items;
      }
      if(index == 4){
        if(items.includes('%20')){
          console.log("Clean devision")
          const cleanDevision = items.replace(/%20/g, ' '); 
          devision=cleanDevision;
        }else{
          devision=items;
        } 
      }
      if(index == 5){
        if(items.includes('%20')){
          console.log("Clean deaprtment")
          const cleanDepartment = items.replace(/%20/g, ' '); 
          department=cleanDepartment;
        }else{
          department=items;
        } 
      }
    })
    console.log("path",path)
    console.log("siteId",siteId)
    console.log("folderName",folderName)
    console.log("department",department)
    console.log("devision",devision)
    currentDepartment=department;
    currentDevision=devision;
    cleanUrlInMyRequest=true;
    getdoclibdata(path,siteId,folderName);
    }
    
  }, []);
  // end
  /////////////////// DMS Code start / ////////////////////////////////////
  const buttonDivRef = useRef<HTMLDivElement>(null); 
  const [showMyrequButtons, setShowMyrequButtons] = useState(true); // Initially hidden
  const [showMyfavButtons, setShowMyfavButtons] = useState(false); // Initially hidden
  const [Myreqormyfav, setMyreqormyfav] = useState(''); // Initially hidden
  // console.log(Myreqormyfav , "Myreqormyfav")
    // console.log("This is current side ID",currentsiteID)
    const currentUserEmailRef = useRef('');
    useEffect(() => {
       getcurrentuseremail()
getdata()
       
  }, []);
  const getdata = async () => {
    debugger
   const ids = window.location.search;
   //  alert(ids)
   const originalString = ids;
   // alert(originalString)
   const idNum2 :any = originalString.substring(1);
   // alert(idNum2)
   const getgroup =   await sp.web.lists
   .getByTitle("ARGGroupandTeam")
   .items.select("*,InviteMemebers/Id,InviteMemebers/Title,InviteMemebers/EMail,GroupType").expand("InviteMemebers")()
   .then((res) => {
     // arr=res;
     console.log(res , ":response")
     // debugger
     console.log("res------",res)
    //  setArrDetails(res)
   })
   .catch((error) => {
     console.log("Error fetching data: ", error);
   });
 }

  const myrequestbuttonclick =()=>{
    const musa = document.getElementById('Myrequestbutton')
      if(musa){
        // alert("enter")
        musa.click();
        // alert("click")
      }
  
   }
  
   const getcurrentuseremail = async()=>{
    const userProfile = await sp.profiles.myProperties();
    console.log(userProfile , "userProfile")
    console.log(userProfile.Title , "userProfile userProfile.Title")
    const userdata = await sp.web.currentUser();
    currentUserEmailRef.current = userdata.Email;
    myrequestbuttonclick()
    // console.log(currentUserEmailRef.current, "currentuser")
   }
  
  
    const fetchAndBuildTree2 = async () => {
      event.preventDefault()
      event.stopImmediatePropagation()
      event.stopPropagation()
      try {
        //Old working code
      //  Fetch data from EntityDivisionDepartmentMappingMasterList
        const entityItems = await sp.web.lists
          .getByTitle("EntityDivisionDepartmentMappingMasterList")
          .items.select(
            "Entitylookup/Title, Entitylookup/SiteURL", "Entitylookup/SiteID" ,
            "Devisionlookup/Title",
            "Departmentlookup/Title",
            "Devisionlookup/Active",
            "Departmentlookup/Active"
          )
          .expand("Entitylookup", "Devisionlookup", "Departmentlookup")
          .filter("Entitylookup/Active eq 'Yes'")();
           console.log(entityItems, "entityItems 1")
          const uniqueEntityMap = new Map();
          const uniqueEntitiesWithAccess: any = [];
          
          // Loop through each item and check permissions
          for (const item of entityItems) {
            const entityTitle = item.Entitylookup.Title;
            try {
              const subsiteWeb = await sp.site.openWebById(item.Entitylookup.SiteID);
              const hasAccess = await subsiteWeb.web.currentUserHasPermissions(PermissionKind.ViewListItems);
          
              if (hasAccess) {
                // Add to uniqueEntitiesWithAccess only if user has access
                uniqueEntityMap.set(entityTitle, item); // Store the item or any required data
                uniqueEntitiesWithAccess.push(item);  // Add the item to the list of entities with access
                console.log(`User has access to site: ${entityTitle}`, item);
              } else {
                console.log(`User does not have access to site: ${entityTitle}`);
              }
            } catch (error) {
              console.error(`Error while checking access for site: ${entityTitle}`, error);
            }
          }
    console.log(uniqueEntityMap , "uniqueEntityMap ......")
    console.log(uniqueEntitiesWithAccess , "uniqueEntitiesWithAccess");
        /// New Code 
  
  
        // Fetch data from DMSFolderMaster
        const folderItems = await sp.web.lists
          .getByTitle("DMSFolderMaster")
          .items.getAll();
         console.log("folderItems", folderItems);
  
        const myButton = document.getElementById("mybutton");
             const createFileButton=document.getElementById("createFileButton");
             const createFileButton2=document.getElementById("createFileButton2");
                   const createFolderButton=document.getElementById("createFolderButton");
        // Create a map to hold folder data by SiteTitle, Devision, Department
        const folderMap = new Map();
        folderItems.forEach((folderItem) => {
          const {
            SiteTitle,
            Devision,
            Department,
            DocumentLibraryName,
            FolderName,
            ParentFolderId,
            FolderPath,
          } = folderItem;
          if (SiteTitle) {
            const key = `${SiteTitle.trim()}::${Devision?.trim() || ""}::${
              Department?.trim() || ""
            }`;
            if (!folderMap.has(key)) {
              folderMap.set(key, []);
            }
            if (DocumentLibraryName) {
              folderMap
                .get(key)
                .push({
                  FolderPath,
                  ParentFolderId,
                  DocumentLibraryName,
                  FolderName: Array.isArray(FolderName)
                    ? FolderName
                    : [FolderName],
                });
            }
          }
        });
        // console.log(folderMap, "folderMap");
        // const entitiesMap = new Map();
        const entitiesMap: any = new Map();
  
        uniqueEntitiesWithAccess.forEach((item:any) => {
          const entityTitle = item.Entitylookup.Title;
          const siteURL = item.Entitylookup.SiteURL;
          const siteID = item.Entitylookup.SiteID;
        
          if (!entitiesMap.has(entityTitle)) {
            entitiesMap.set(entityTitle, {
              siteURL: siteURL,
              entityTitle: entityTitle,
              siteID: siteID,
              devisions: new Map(),
            });
          }
        
          const entry = entitiesMap.get(entityTitle);
          const devisionTitle = item.Devisionlookup?.Title;
          const departmentTitle = item.Departmentlookup?.Title;
          const isDevisionActive = item.Devisionlookup?.Active === "Yes";
          const isDepartmentActive = item.Departmentlookup?.Active === "Yes";
        
          if (devisionTitle && isDevisionActive) {
            if (!entry.devisions.has(devisionTitle)) {
              entry.devisions.set(devisionTitle, {
                departments: new Set(),
                docLibs: new Set(),
              });
            }
            const devisionEntry = entry.devisions.get(devisionTitle);
            if (departmentTitle && isDepartmentActive) {
              devisionEntry.departments.add(departmentTitle);
            } else if (!departmentTitle || !isDepartmentActive) {
              const nullDeptKey = `${entityTitle.trim()}::${devisionTitle.trim()}::`;
              // Handle case where department is null or inactive
            }
          }
        });
        const buildFolderStructure = (
          folderList: HTMLElement,
          folders: any[],
          parentFolderId: string | null
        ) => {
          const filteredFolders = folders.filter(
            (folder) => folder.ParentFolderId === parentFolderId
          );
          filteredFolders.forEach((folder) => {
            const folderElement = document.createElement("li");
            folderElement.textContent = folder.FolderName;
            folderList.appendChild(folderElement);
  
            const childFolderList = document.createElement("ul");
            childFolderList.style.display = "none";
            folderElement.appendChild(childFolderList);
  
            folderElement.addEventListener("click", (event) => {
              event.stopPropagation();
              // currentFolder = folder.FolderName;
              toggleVisibility(childFolderList);
            });
  
            // Recursively build the structure for subfolders
            buildFolderStructure(childFolderList, folders, folder.FolderName);
          });
        };
        // Build the folder tree structure in the DOM
        const container = document.getElementById("folderContainer2");
  
        if (container) {
          container.innerHTML = ""; // Clear previous contents
        } else {
          console.error("Container element not found");
        }
        // container.innerHTML = ''; // Clear previous contents
  
        const toggleVisibility = (element: any, forceShow = false) => {
          const isVisible = element.style.display === "block";
          element.style.display = isVisible && !forceShow ? "none" : "block";
        };
        const createImageElement = (src: string, alt: string) => {
          const img = document.createElement("img");
          img.src = require("../assets/add-folder.png");
          img.alt = alt;
          img.style.float = "left";
          img.style.width = "20px"; // Adjust the size as needed
          img.style.height = "20px"; // Adjust the size as needed
          img.style.marginRight = "5px"; // Space between image and text
          return img;
        };
      //     const createToggleButton = () => {
      //     const link = document.createElement("a");
      //     link.textContent = "+"; // Initial text
      //     link.className="toggle-button"
      //     link.style.cursor = "pointer";
      //     link.style.textDecoration = "none";
          
      //     link.addEventListener("click", (e) => {
      //         e.preventDefault()
      //         console.log("Button clicked +/-");
      //         if (link.textContent === "+") {
      //             link.textContent = "-"; // Change to minus when content is visible
      //         } else if(link.textContent){
      //             link.textContent = "+"; // Change to plus when content is hidden
      //         }
      //     });
      
      //     return link;
      // };
      const createToggleButton = () => {
        const link = document.createElement("a");
        link.id="toggle-plus/minus";
        link.textContent = "+"; // Initial text
        link.className="toggle-button"
        link.style.cursor = "pointer";
        link.style.textDecoration = "none";
       
        // link.addEventListener("click", (e) => {
        //     e.preventDefault()
        //     console.log("Button clicked +/-");
        //     if (link.textContent === "+") {
        //         link.textContent = "-"; // Change to minus when content is visible
        //     } else if(link.textContent){
        //         link.textContent = "+"; // Change to plus when content is hidden
        //     }
        // });
   
        return link;
    };
        entitiesMap.forEach((value:any, entityTitle:any) => {
          const titleElement = document.createElement("p");
  
          // titleElement.textContent = entityTitle;
          titleElement.classList.add("folder", "icon");
          titleElement.style.cursor = "pointer";
          // const entityImage = createImageElement(
          //   "icons/entity-icon.png",
          //   "Entity Icon"
          // );
          const toggleButton=createToggleButton();
          titleElement.appendChild(toggleButton);
          titleElement.appendChild(document.createTextNode(entityTitle));
  
          if (container) {
            container.appendChild(titleElement);
          } else {
            console.error("Container element not found");
          }
  
          const documentList = document.createElement("ul");
          titleElement.appendChild(documentList);
          documentList.style.display = "none";
          /////start: Display Document library with recursive folder under Enitiy directly when Devision and Department Null /////
          const nullKey = `${entityTitle.trim()}::::`;
          if (folderMap.has(nullKey)) {
            const documentLibraries = folderMap.get(nullKey) || [];
  
            // Create a map to store unique DocumentLibraryNames and their details
            const uniqueDocLibs = new Map();
  
            // Iterate over document libraries and populate the map with unique DocumentLibraryNames
            documentLibraries.forEach((item: any) => {
              if (!uniqueDocLibs.has(item.DocumentLibraryName)) {
                uniqueDocLibs.set(item.DocumentLibraryName, {
                  folders: [],
                  folderPath: item.FolderPath, // Store FolderPath with other details
                });
              }
              uniqueDocLibs.get(item.DocumentLibraryName).folders.push(item);
            });
  
            // Now render each unique DocumentLibraryName and its associated folders
            uniqueDocLibs.forEach((data, docLibName) => {
              const docLibElement = document.createElement("li");
              docLibElement.textContent = docLibName;
  
              // Optionally display the FolderPath in the docLibElement
              const pathText = document.createElement("span");
              // pathText.textContent = ` (${data.folderPath})`; // Display FolderPath
              docLibElement.appendChild(pathText);
  
              documentList.appendChild(docLibElement);
  
              const folderList = document.createElement("ul");
              folderList.style.display = "none";
              folderList.style.width = "240px";
              const entityImage = createImageElement(
                "icons/entity-icon.png",
                "Entity Icon"
              );
              docLibElement.appendChild(entityImage);
              docLibElement.appendChild(folderList);
  
              // Handle click to toggle the visibility of the folder list
              docLibElement.addEventListener("click", (event:any) => {
                event.preventDefault()
                event.stopPropagation();
                // setlistorgriddata('')
                // setShowMyrequButtons(false)
                // setShowMyfavButtons(false)
                handleNavigation(value.entityTitle, null , null , docLibName , null )
                toggleVisibility(folderList);
                getdoclibdata(data.folderPath , value.siteID , docLibName);
                currentfolderpath = data.folderPath
                currentDocumentLibrary = docLibName;
                currentEntityURL = value.siteURL;
                currentEntity = value.entityTitle
                currentsiteID = value.siteID
                currentDevision = ''
                currentDepartment = ''
                currentFolder = ''
       
                console.log(currentEntityURL , "currentEntityURL")
                console.log(currentsiteID , "currentsiteID")
                console.log(currentEntity , "currentEntity")
                console.log(currentDocumentLibrary , "currentFolder")
                console.log(currentfolderpath , "currentfolderpath")
                console.log(currentDevision , "currentfolderpath")
                console.log(currentDepartment , "currentfolderpath")
                     createFileButton.style.display = "block";
                     createFileButton2.style.display = "block";
                      if(createFolderButton){
                  createFolderButton.style.display="block"
                }
                
                if(createFileButton){
                  createFileButton.style.display = "block";
                }
                if(createFileButton2){
                  createFileButton2.style.display = "block";
                }
                      
                if (myButton) {
                  myButton.textContent = `Create Folder under ${docLibName}`;
                } else {
                  console.error();
                }
              });
  
              // Handle double-click to hide the folder list
              docLibElement.addEventListener("dblclick", (event) => {
                event.stopPropagation();
                toggleVisibility(folderList, false);
              });
  
              // Function to build the folder structure recursively
              const buildFolderStructure = (
                parentFolderId: any,
                parentElement: any
              ) => {
                data.folders.forEach((item: any) => {
                  const folderNamesArray = Array.isArray(item.FolderName)
                    ? item.FolderName
                    : [item.FolderName];
  
                  folderNamesArray.forEach((folderName: any) => {
                    if (folderName && item.ParentFolderId === parentFolderId) {
                      // Only display non-null folder names
                      const folderElement = document.createElement("li");
                      folderElement.textContent = folderName;
                      parentElement.appendChild(folderElement);
                      const entityImage = createImageElement(
                        "icons/entity-icon.png",
                        "Entity Icon"
                      );
                      folderElement.appendChild(entityImage);
                      const subFolderList = document.createElement("ul");
                      subFolderList.style.display = "none";
                      subFolderList.style.width = "240px";
                      folderElement.appendChild(subFolderList);
  
                      folderElement.addEventListener("click", (event:any) => {
                         event.preventDefault();  // Prevent default action
                         event.stopPropagation();  // Stop event bubbling
                         console.log("Event listener triggered");
                        currentEntityURL = value.siteURL;
                        currentsiteID = value.siteID
                        currentEntity = value.entityTitle
                        currentDocumentLibrary = docLibName;
                        currentFolder  = folderName;
                        parentfolder = item.ParentFolderId;
                        currentfolderpath = item.FolderPath;
                        currentDevision = ''
                        currentDepartment = ''
                        console.log(currentEntityURL , "currentEntityURL")
                        console.log(currentsiteID , "currentsiteID")
                        console.log(currentEntity , "currentEntity")
                        console.log(currentDocumentLibrary , "currentDocumentLibrary")
                        console.log(currentFolder , "currentFolder")
                        console.log(parentfolder , "parentfolder")
                        console.log(currentfolderpath , "currentfolderpath");
                        handleNavigation(value.entityTitle, null , null , docLibName , folderName )
                        event.stopPropagation();
                        getdoclibdata(item.FolderPath,currentsiteID ,docLibName )
                        if (myButton) {
                          myButton.textContent = `Create Folder under ${folderName}`;
                        } else {
                          console.error();
                        }
  
          
                        toggleVisibility(subFolderList);
  
                        // Clear existing sub-folder list to avoid duplications
                        subFolderList.innerHTML = "";
  
                        // Recursively build the sub-folder structure
                        buildFolderStructure(folderName, subFolderList);
                      });
                    }
                  });
                });
              };
  
              // Start building the folder structure from the root level (null ParentFolderId)
              buildFolderStructure(null, folderList);
            });
          }
          /////End Display Document library with recursive folder under Enitiy directly when Devision and Department Null /////
          const devisionList = document.createElement("ul");
          devisionList.style.display = "none";
          titleElement.appendChild(devisionList);
  
          value.devisions.forEach((devisionValue: any, devisionTitle: any) => {
            const devisionElement = document.createElement("li");
            devisionElement.textContent = devisionTitle;
            devisionElement.classList.add("folder", "icon");
            devisionElement.style.cursor = "pointer";
            devisionList.appendChild(devisionElement);
  
            const docLibList = document.createElement("ul");
            docLibList.style.display = "none";
            const entityImage = createImageElement(
              "icons/entity-icon.png",
              "Entity Icon"
            );
            devisionElement.appendChild(entityImage);
            devisionElement.appendChild(docLibList);
  
            // Display unique DocumentLibraryName under Devision
            devisionValue.docLibs.forEach((docLibName: any) => {
              const docLibElement = document.createElement("li");
              docLibElement.textContent = docLibName;
              docLibElement.classList.add("file-icon", "icon");
              docLibList.appendChild(docLibElement);
  
              const folderList = document.createElement("ul");
              folderList.style.display = "none";
  
              docLibElement.appendChild(folderList);
  
              const docLibKey = `${entityTitle.trim()}::${devisionTitle.trim()}::`;
              const docLibFolders = folderMap.get(docLibKey) || [];
              docLibFolders.forEach((folderItem: any) => {
                const folderElement = document.createElement("li");
                folderElement.textContent = folderItem.FolderName;
  
                folderList.appendChild(folderElement);
              });
  
              docLibElement.addEventListener("click", (event) => {
                console.log(devisionValue, "devisionValue");
                event.stopPropagation();
                currentDocumentLibrary = docLibName;
                // currentFolder = '';
                currentDevision = devisionTitle;
                // currentDepartment = '';
                currentEntityURL = value.siteURL;
                currentEntity = value.entityTitle
                currentsiteID = value.siteID
         
                console.log("currentEntityURL", currentEntityURL);
                console.log("currentEntity", currentEntity);
                console.log("currentsiteID", currentsiteID);
                console.log("currentDevision", currentDevision);
                console.log("currentDocumentLibrary", currentDocumentLibrary);
                if (myButton) {
                  myButton.textContent = `Create Library under ${docLibName}`;
                } else {
                  console.error();
                }
  
                toggleVisibility(folderList);
              });
  
              docLibElement.addEventListener("dblclick", (event) => {
                event.stopPropagation();
                toggleVisibility(folderList, false);
              });
            });
  
            const departmentList = document.createElement("ul");
  
            departmentList.style.display = "none";
            devisionElement.appendChild(departmentList);
  
            devisionValue.departments.forEach((departmentTitle: any) => {
              const departmentElement = document.createElement("li");
              departmentElement.textContent = departmentTitle;
              departmentElement.classList.add("folder");
              departmentElement.style.cursor = "pointer";
              departmentList.appendChild(departmentElement);
  
              const documentList = document.createElement("ul");
              documentList.style.display = "none";
              documentList.style.width = "300px";
              const entityImage = createImageElement(
                "icons/entity-icon.png",
                "Entity Icon"
              );
              departmentElement.appendChild(entityImage);
              departmentElement.appendChild(documentList);
  
              departmentElement.addEventListener("click", (event) => {
                currentEntityURL = value.siteURL;
                      currentsiteID = value.siteID
                      currentEntity = value.entityTitle;
                      currentDevision = devisionTitle;
                      currentDepartment = departmentTitle;
                      currentDocumentLibrary = ''
                      currentFolder = ''
                      currentfolderpath = ''
                    console.log("currentEntityURL", currentEntityURL);
                    console.log("currentsiteID", currentsiteID);
                    console.log("currentEntity", currentEntity);
                    console.log("currentDevision", currentDevision);
                    console.log("currentDepartment", currentDepartment);
                    handleNavigation(value.entityTitle, devisionTitle , departmentTitle , null , null )
                event.stopPropagation();
                if (myButton) {
                  myButton.textContent = `Create Library under ${departmentTitle}`;
                } else {
                  console.error();
                }
  
                // Prevent toggling visibility before the list is populated
                if (documentList.innerHTML === "") {
                  const key = `${entityTitle.trim()}::${devisionTitle.trim()}::${departmentTitle.trim()}`;
                  const documentLibraries = folderMap.get(key) || [];
                  documentList.innerHTML = ""; 
                  const uniqueDocLibs = new Map();
  
                  documentLibraries.forEach((item: any) => {
                    if (!uniqueDocLibs.has(item.DocumentLibraryName)) {
                      uniqueDocLibs.set(item.DocumentLibraryName, {
                        folders: [],
                        folderPath: item.FolderPath, // Store FolderPath
                      });
                    }
                    uniqueDocLibs
                      .get(item.DocumentLibraryName)
                      .folders.push(item);
                  });
  
                  uniqueDocLibs.forEach((data, docLibName) => {
                    console.log(uniqueDocLibs , "uniqueDocLibs")
                    const docLibElement = document.createElement("li");
                    docLibElement.textContent = docLibName;
  
                    // Optionally display the FolderPath in the docLibElement
                    // const pathText = document.createElement("span");
                    // pathText.textContent = ` (${data.folderPath})`; // Display FolderPath
                    // docLibElement.appendChild(pathText);
  
                    documentList.appendChild(docLibElement);
  
                    const folderList = document.createElement("ul");
                    folderList.style.display = "none";
                    folderList.style.width = "351px";
                    const entityImage = createImageElement(
                      "icons/entity-icon.png",
                      "Entity Icon"
                    );
                    docLibElement.appendChild(entityImage);
                    docLibElement.appendChild(folderList);
  
                    docLibElement.addEventListener("click", (event) => {
                      event.stopPropagation();
                      currentEntityURL = value.siteURL;
                      currentsiteID = value.siteID
                      currentEntity = value.entityTitle;
                      currentDevision = devisionTitle;
                      currentDocumentLibrary = docLibName;
                      currentDepartment = departmentTitle;
                      currentfolderpath = data.folderPath,
                      currentFolder =''
                      console.log(data, data  ,"data")
                    console.log("currentEntityURL", currentEntityURL);
                    console.log("currentsiteID", currentsiteID);
                    console.log("currentEntity", currentEntity);
                    console.log("currentDevision", currentDevision);
                    console.log("currentDepartment", currentDepartment);
                    console.log("currentDocumentLibrary", currentDocumentLibrary);
                    console.log("currentfolderpath", currentfolderpath);
                    console.log("parentfolder", parentfolder);
                    getdoclibdata(data.folderPath , value.siteID , docLibName)
                    handleNavigation(value.entityTitle, devisionTitle , departmentTitle , docLibName , null )
                      console.log(
                        "FolderPath for document library:",
                        data.folderPath
                      );
                      toggleVisibility(folderList);
                          const createFileButton=document.getElementById("createFileButton")
                          const createFileButton2=document.getElementById("createFileButton")
                      createFileButton.style.display="block";
                      createFileButton2.style.display="block";
                      if (myButton) {
                        myButton.textContent = `Create Folder under ${docLibName}`;
                      } else {
                        console.error();
                      }
                    });
  
                    docLibElement.addEventListener("dblclick", (event) => {
                      event.stopPropagation();
                      toggleVisibility(folderList, false);
                    });
                    const buildFolderStructure = (
                      parentFolderId: any,
                      parentElement: any
                    ) => {
                      data.folders.forEach((item: any) => {
                    
                        const folderNamesArray = Array.isArray(item.FolderName)
                          ? item.FolderName
                          : [item.FolderName];
  
                        folderNamesArray.forEach((folderName: any) => {
              
                          if (
                            folderName &&
                            item.ParentFolderId === parentFolderId
                          ) {
                            const folderElement = document.createElement("li");
                            folderElement.textContent = folderName;
                            parentElement.appendChild(folderElement);
                            const entityImage = createImageElement(
                              "icons/entity-icon.png",
                              "Entity Icon"
                            );
                            folderElement.appendChild(entityImage);
                            const subFolderList = document.createElement("ul");
                            subFolderList.style.display = "none";
                            folderElement.appendChild(subFolderList);
  
                            folderElement.addEventListener("click", (event) => {
                              currentEntityURL = value.siteURL;
                              currentEntity = value.entityTitle;
                              currentsiteID = value.siteID
                              currentDevision = devisionTitle;
                              currentDepartment = departmentTitle;
                              currentDocumentLibrary = docLibName;
                              currentFolder = folderName
                    
                            console.log("currentEntityURL", currentEntityURL);
                            console.log("currentEntity", currentEntity);
                            console.log("currentsiteID", currentsiteID);
                            console.log("currentDevision", currentDevision);
                            console.log("currentDepartment", currentDepartment);
                            console.log("currentDocumentLibrary", currentDocumentLibrary);
                            console.log("currentfolderpath", item.FolderPath);
                            getdoclibdata(item.FolderPath,currentsiteID , docLibName)
                            handleNavigation(value.entityTitle, devisionTitle , departmentTitle , docLibName , folderName )
                                 const createFileButton=document.getElementById("createFileButton")
                            createFileButton.style.display="block";
                                 const createFileButton2=document.getElementById("createFileButton")
                            createFileButton2.style.display="block";
                              if (myButton) {
                                myButton.textContent = `Create Folder under ${folderName}`;
                              } else {
                                console.error();
                              }
                              event.stopPropagation();
                              toggleVisibility(subFolderList);
                              subFolderList.innerHTML = "";
                              buildFolderStructure(folderName, subFolderList);
                            });
                          }
                        });
                      });
                    };
                    buildFolderStructure(null, folderList);
                  });
                }
  
                toggleVisibility(documentList);
              });
  
              departmentElement.addEventListener("dblclick", (event) => {
                event.stopPropagation();
                toggleVisibility(documentList, false);
              });
            });
  
            ///Start: display all Document libraries under Devision directly if Department null with nested folder //////
            const keyForDevisionOnly = `${entityTitle.trim()}::${devisionTitle.trim()}::`;
  
            if (folderMap.has(keyForDevisionOnly)) {
              const documentLibraries = folderMap.get(keyForDevisionOnly) || [];
              // console.log(documentLibraries, "documentLibraries");
              const uniqueDocLibNames = new Set();
  
              documentLibraries.forEach((item: any) => {
                const normalizedDocLibName =
                  item.DocumentLibraryName.trim().toLowerCase();
  
                if (!uniqueDocLibNames.has(normalizedDocLibName)) {
                  uniqueDocLibNames.add(normalizedDocLibName);
  
                  const docLibElement = document.createElement("li");
                  docLibElement.textContent = item.DocumentLibraryName;
                  departmentList.appendChild(docLibElement);
  
                  const folderList = document.createElement("ul");
                  folderList.style.display = "none";
                  const entityImage = createImageElement(
                    "icons/entity-icon.png",
                    "Entity Icon"
                  );
                  docLibElement.appendChild(entityImage);
  
                  docLibElement.appendChild(folderList);
  
                  docLibElement.addEventListener("click", (event) => {
                    event.stopPropagation();
                    currentEntityURL = value.siteURL; // Use the SiteURL from entitiesMap
                    currentsiteID = value.siteID
                    currentEntity = value.entityTitle
                    currentDevision = devisionTitle;
                    currentDepartment = ''
                    currentFolder=''
                    currentDocumentLibrary = item.DocumentLibraryName;
                    currentfolderpath = item.FolderPath;
                    console.log("currentEntityURL", currentEntityURL);
                    console.log("currentsiteID", currentsiteID);
                    console.log("currentEntity", currentEntity);
                    console.log("currentDevision", currentDevision);
                    console.log("currentDepartment", currentDepartment);
                    console.log("currentDocumentLibrary", currentDocumentLibrary);
                    console.log("currentfolderpath", currentfolderpath);
                    getdoclibdata(item.FolderPath , value.siteID , item.DocumentLibraryName)
                    handleNavigation(value.entityTitle , devisionTitle, null , item.DocumentLibraryName )
                    const createFileButton=document.getElementById("createFileButton")
                    createFileButton.style.display="block";
                    const createFileButton2=document.getElementById("createFileButton2")
                    createFileButton2.style.display="block";
                    if (myButton) {
                      myButton.textContent = `Create Folder under ${item.DocumentLibraryName}`;
                    } else {
                      console.error();
                    }
                    toggleVisibility(folderList);
                    folderList.innerHTML = "";
                    const buildFolderStructure = (
                      parentFolderId: any,
                      parentElement: any
                    ) => {
                      const createImageElement = (src: string, alt: string) => {
                        const img = document.createElement("img");
                        img.src = require("../assets/add-folder.png");
                        img.alt = alt;
                        img.style.float = "left";
                        img.style.width = "20px"; // Adjust the size as needed
                        img.style.height = "20px"; // Adjust the size as needed
                        img.style.marginRight = "5px"; // Space between image and text
                        return img;
                      };
                      documentLibraries.forEach((libItem: any) => {
                      
                        if (
                          libItem.DocumentLibraryName.trim().toLowerCase() ===
                          normalizedDocLibName
                        ) {
                          const folderNamesArray = Array.isArray(
                            libItem.FolderName
                          )
                            ? libItem.FolderName
                            : [libItem.FolderName];
  
                          folderNamesArray.forEach((folderName: any) => {
                           
                            if (
                              folderName &&
                              libItem.ParentFolderId === parentFolderId
                            ) {
                              // Only display non-null folder names
                              const folderElement2 = document.createElement("li");
                              folderElement2.textContent = folderName;
                              parentElement.appendChild(folderElement2);
                              const folderPath = libItem.FolderPath; 
                              const entityImage = createImageElement(
                                "icons/entity-icon.png",
                                "Entity Icon"
                              );
                              folderElement2.appendChild(entityImage);
                              const subFolderList2 = document.createElement("ul");
                              subFolderList2.style.display = "none";
  
                              // const entityImage = createImageElement('icons/entity-icon.png', 'Entity Icon')
                              folderElement2.appendChild(entityImage);
                              subFolderList2.appendChild(entityImage);
                              folderElement2.appendChild(subFolderList2);
  
                              folderElement2.addEventListener(
                                
                                "click",
                                (event) => {
                                  currentEntityURL = value.siteURL; // Use the SiteURL from entitiesMap
                                  currentsiteID = value.siteID
                                  currentEntity = value.entityTitle
                                  currentDevision = devisionTitle;
                                  currentDepartment = null
                                  currentDocumentLibrary = item.DocumentLibraryName;
                                  currentFolder = folderName
                                  currentDepartment=''
                                  currentFolder = folderPath
                                  // currentfolderpath = item.FolderPath;
                                  parentfolder = parentFolderId
                                  console.log("currentEntityURL", currentEntityURL);
                                  console.log("currentsiteID", currentsiteID);
                                  
                                  console.log("currentEntity", currentEntity);
                                  console.log("currentDevision", currentDevision);
                                  console.log("currentDepartment", currentDepartment);
                                  console.log("currentDocumentLibrary", currentDocumentLibrary);
                                  console.log("currentFolder", currentFolder);
                                  console.log("currentfolderpath", folderPath);
                                  console.log("parentfolder", parentfolder);
                                  handleNavigation(value.entityTitle , devisionTitle ,null , item.DocumentLibraryName , folderName)
                                  event.stopPropagation();
                                  toggleVisibility(subFolderList2);
                                  console.log("enter ee");
                                  getdoclibdata(folderPath,currentsiteID, item.DocumentLibraryName)
                                    const createFileButton=document.getElementById("createFileButton")
                                  createFileButton.style.display="block";
                                    const createFileButton2=document.getElementById("createFileButton")
                                  createFileButton2.style.display="block";
                                  if (myButton) {
                                    myButton.textContent = `Create Folder under ${folderName}`;
                                  } else {
                                    console.error();
                                  }
  
                                  // Clear existing sub-folder list to avoid duplications
                                  subFolderList2.innerHTML = "";
  
                                  // Recursively build the sub-folder structure
                                  buildFolderStructure(
                                    folderName,
                                    subFolderList2
                                  );
                                }
                              );
                            }
                          });
                        }
                      });
                    };
  
                    // Start building the folder structure from the root level (null ParentFolderId)
                    buildFolderStructure(null, folderList);
                  });
  
                  // Optionally, expand the folder structure by default
                  // buildFolderStructure(folderList, documentLibraries, null);
                }
              });
            }
  
            ///End: display all Document libraries under Devision directly if Department null with nested folder //////
  
            devisionElement.addEventListener("click", (event) => {
              event.stopPropagation();
              currentDevision = devisionTitle;
              currentEntityURL = value.siteURL;
              currentEntity = value.entityTitle
              currentsiteID = value.siteID
              currentDepartment = ''
              currentDocumentLibrary = ''
              currentFolder =''
              currentfolderpath = ''
              console.log("currentEntityURL", currentEntityURL);
              console.log("currentsiteID", currentsiteID);
              console.log("currentEntity", currentEntity);
              console.log("currentDevision", currentDevision);
              handleNavigation(value.entityTitle , devisionTitle , null , null , null)
              toggleVisibility(departmentList);
              // Toggle plus/minus icon
              devisionElement.classList.remove("expanded");
               // const //createFileButton=document.getElementById("createFileButton")
             // createFileButton.style.display="block";
              if (myButton) {
                myButton.textContent = `Create Library under ${devisionTitle}`;
              } else {
                console.error();
              }
            });
  
            devisionElement.addEventListener("dblclick", (event) => {
              event.stopPropagation();
              toggleVisibility(departmentList, false);
              // Toggle plus/minus icon
              devisionElement.classList.remove("expanded");
            });
          });
  
          let clickTimer:any;
          titleElement.addEventListener("click" , async (event)=>{
            // alert("in first")
            // new code added.
                  // toggle createfolder button based on the permission
                  // Get the users in the group
                  // const subsiteContext=await sp.site.openWebById(value.siteID);
                  // const usersFromAdmin = await subsiteContext.web.siteGroups.getByName(`${value.entityTitle}_Admin`).users();
                  // const usersFromInitiator=await subsiteContext.web.siteGroups.getByName(`${value.entityTitle}_Initiator`).users();
                  // console.log("usersFromAdmin",usersFromAdmin);
                  // console.log("usersFromInitiator",usersFromInitiator);
                  try {
                    const currentUser = await sp.web.currentUser();
                    const userGroups = await sp.web.siteUsers.getById(currentUser.Id).groups();
                    const isMemberOfGroup = userGroups.some(group => group.Title === `${currentEntity}_Admin`);
                    const isMemberOfSuperAdmin = userGroups.some(group => group.Title === `DMSSuper_Admin`);
                    console.log("isMemberOfSuperAdmin",isMemberOfSuperAdmin);
                    console.log(`Is member of ${currentEntity}_Admin:`, isMemberOfGroup);
                    // console.log(`User is a member of the group: ${currentEntity}_Admin`);
                    if (isMemberOfGroup || isMemberOfSuperAdmin) {
                    console.log(`User is a member of the group: ${currentEntity}_Admin`);
                    if(createFileButton){
                      createFileButton.style.display=  "block";
                    }
                    if(createFileButton2){
                    createFileButton2.style.display="block";
                    }
                   }else {
                      console.log(`User is not a member of the group: ${currentEntity}_Admin`);
                      if(createFileButton){
                        createFileButton.style.display="none";
                      }
                      if(createFileButton2){
                        createFileButton2.style.display="none";
                      }
                    
                
                     }
                  } catch (error) {
                    console.log(`User is not a member of the group: ${currentEntity}_Admin`);
                    if(createFileButton){
                      createFileButton.style.display="none";
                    }
                    if(createFileButton2){
                      createFileButton2.style.display="none";
                    }
                
                   
                  }
          })
          titleElement.addEventListener("click", async(event) => {
            // alert("in second")
            // Toggle +/- button
                  // const plusMinus = document.getElementById("toggle-plus/minus");
                  if(toggleButton.textContent === "+") {
                    toggleButton.textContent = "-";
                  }else if(toggleButton.textContent){
                    toggleButton.textContent = "+";
                  }
            const createFileButton=document.getElementById("createFileButton")
            const createFileButton2=document.getElementById("createFileButton2")
            try {
              const currentUser = await sp.web.currentUser();
              const userGroups = await sp.web.siteUsers.getById(currentUser.Id).groups();
              const isMemberOfGroup = userGroups.some(group => group.Title === `${currentEntity}_Admin`);
              const isMemberOfSuperAdmin = userGroups.some(group => group.Title === `DMSSuper_Admin`);
              console.log("isMemberOfSuperAdmin",isMemberOfSuperAdmin);
              console.log(`Is member of ${currentEntity}_Admin:`, isMemberOfGroup);
              // console.log(`User is a member of the group: ${currentEntity}_Admin`);
              if (isMemberOfGroup || isMemberOfSuperAdmin) {
              console.log(`User is a member of the group: ${currentEntity}_Admin`);
              if(createFileButton){
                createFileButton.style.display=  "block";
              }
              if(createFileButton2){
              createFileButton2.style.display="block";
              }
             }else {
                console.log(`User is not a member of the group: ${currentEntity}_Admin`);
                if(createFileButton){
                  createFileButton.style.display="none";
                }
                if(createFileButton2){
                  createFileButton2.style.display="none";
                }
              
          
               }
            } catch (error) {
              console.log(`User is not a member of the group: ${currentEntity}_Admin`);
              if(createFileButton){
                createFileButton.style.display="none";
              }
              if(createFileButton2){
                createFileButton2.style.display="none";
              }
          
             
            }
              event.stopPropagation();
              // const createFileButton2 = document.getElementById("createFileButton2");
              // Clear any existing timer
              clearTimeout(clickTimer);
          
              // Set a new timer
              clickTimer = setTimeout(() => {
                  setlistorgriddata('');
                  currentEntity= value.entityTitle
                  currentEntityURL = value.siteURL;
                  currentsiteID = value.siteID;
                  currentDevision=""
              currentDepartment =''
                  currentDocumentLibrary=""
                  currentFolder=""
                  currentfolderpath=""
                  console.log(value.entityTitle, "value");
                  console.log(currentsiteID, "currentsiteID");
                  console.log("currentEntityURL", currentEntityURL);
                  mydata.push(value.siteURL);
                  console.log(mydata, "my mydata");
                  toggleVisibility(devisionList);
                  toggleVisibility(documentList);
                  const hidegidvewlistviewbutton = document.getElementById("hidegidvewlistviewbutton");
                  const hidegidvewlistviewbutton2 = document.getElementById("hidegidvewlistviewbutton2");
                  if (hidegidvewlistviewbutton) {
                      console.log("enter here .....................");
                      hidegidvewlistviewbutton.style.display = 'none';
                  }
                  if (hidegidvewlistviewbutton2) {
                      console.log("enter here .....................");
                      hidegidvewlistviewbutton2.style.display = 'none';
                  }
                  handleNavigation(value.entityTitle, null, null, null, null);
                  // Toggle plus/minus icon
                  titleElement.classList.toggle("expanded");
                  console.log(value, "value");
                  const createFileButton = document.getElementById("createFileButton");
                  const createFileButton2 = document.getElementById("createFileButton2");
                  // if (createFolderButton) {
                  //     createFolderButton.style.display = "block";
                  // }
                  if (createFileButton) {
                      createFileButton.style.display = "none";
                  }
                  if (createFileButton2) {
                      createFileButton2.style.display = "block";
                  }
                  if (myButton) {
                      myButton.textContent = `Create Library under ${entityTitle}`;
                  } else {
                      console.error();
                  }
                  // fetchData(currentEntityURL);
              }, 300); // Adjust the delay as needed
          });
          
          titleElement.addEventListener("dblclick", async (event) => {
              event.stopPropagation();
              try {
                const currentUser = await sp.web.currentUser();
                const userGroups = await sp.web.siteUsers.getById(currentUser.Id).groups();
                const isMemberOfGroup = userGroups.some(group => group.Title === `${currentEntity}_Admin`);
                const isMemberOfSuperAdmin = userGroups.some(group => group.Title === `DMSSuper_Admin`);
                console.log("isMemberOfSuperAdmin",isMemberOfSuperAdmin);
                console.log(`Is member of ${currentEntity}_Admin:`, isMemberOfGroup);
                // console.log(`User is a member of the group: ${currentEntity}_Admin`);
                if (isMemberOfGroup || isMemberOfSuperAdmin) {
                console.log(`User is a member of the group: ${currentEntity}_Admin`);
                if(createFileButton){
                  createFileButton.style.display=  "block";
                }
                if(createFileButton2){
                createFileButton2.style.display="block";
                }
               }else {
                  console.log(`User is not a member of the group: ${currentEntity}_Admin`);
                  if(createFileButton){
                    createFileButton.style.display="none";
                  }
                  if(createFileButton2){
                    createFileButton2.style.display="none";
                  }
                
            
                 }
              } catch (error) {
                console.log(`User is not a member of the group: ${currentEntity}_Admin`);
                if(createFileButton){
                  createFileButton.style.display="none";
                }
                if(createFileButton2){
                  createFileButton2.style.display="none";
                }
            
               
              }
              // Clear the single click timer
              clearTimeout(clickTimer);
          
              setlistorgriddata('');
              toggleVisibility(devisionList, false);
              toggleVisibility(documentList, false);
              // Toggle plus/minus icon
              titleElement.classList.remove("expanded");
          });
        });
      } catch (error) {
        console.error("Error fetching or building folder tree:", error);
      }
    };
    useEffect(()=>{
      fetchAndBuildTree2();
    },[])
   
    // Call the function to fetch data and build the tree
    // thi is working new function for getting files from documnet library with pagination batching
    // const getdoclibdata = async (FolderPath: any , siteID:any , docLibName:any) => {
    //   // event.preventDefault()
    //   // event.stopPropagation()
    //   // setlistorgriddata('')
    //   // setShowMyrequButtons(false)
    //   // setShowMyfavButtons(false)
    //   console.log('path   ', FolderPath)
    //   console.log('SiteID :    ', siteID)
      
    //   // start
    //   // Empty the routeToDiffSideBar
    //   routeToDiffSideBar="";
    //   // end  

    //   const testidsub = await sp.site.openWebById(siteID);
    //   let files:any = [];
    //   let batchSize = 5000;
    //   let nextLink = null;
    //   let hasMoreItems = true;
    //   currentsiteID=siteID;
    //   currentfolderpath=FolderPath;
    //   const container = document.getElementById("files-container");
    //   container.innerHTML = "";
    //   console.log("folderpath:", FolderPath);
    //   try {
    //     while (hasMoreItems) {
    //       let response;
    //       if (nextLink) {
    //         response = await sp.web(nextLink);
    //       } else {
    //         response = await testidsub.web
    //           .getFolderByServerRelativePath(FolderPath)
    //           .files.select("Name", "Length", "ServerRelativeUrl", "UniqueId","MajorVersion","ListItemAllFields/Status","ListItemAllFields/IsDeleted").expand("ListItemAllFields")
    //           .top(batchSize)();
    //           myfolderdata = response
    //           console.log(response , "response")
    //       }
    //       // Add the current batch of files to the files array
    //       files = [...files, ...response as IFileInfo[]];
    //       // Check if there is a nextLink for more items
    //       if ("@odata.nextLink" in response) {
    //         nextLink = response["@odata.nextLink"];
    //       } else {
    //         hasMoreItems = false; // No more items, exit loop
    //       }
    //     }
    //     console.log("All files fetched:", files);

    //     // Now process the files
    //     // const container = document.getElementById("files-container");
    //     // container.innerHTML = "";
        
    //     // start
    //     // Check if folder is private/public and also check it`s soft/hard delete.
    //     // Filter the list by the document library name
    //     const DMSPreviewFormMasterItems= await sp.web.lists.getByTitle('DMSPreviewFormMaster').items.filter(` DocumentLibraryName eq '${currentDocumentLibrary}' and SiteName eq '${currentEntity}' and IsDocumentLibrary eq 1`)();
    //     console.log(`DMSPreviewFormMaster -> ${currentDocumentLibrary} values`, DMSPreviewFormMasterItems)
    //     // end

    //     // Get the details of the users permission.
    //     // start
    //     //  const user = await testidsub.web.siteUsers.getByEmail(`${currentUserEmailRef.current}`)();
    //     // Get the effective permissions for the specified user
    //     //  const permissions = await library.getUserEffectivePermissions(`${user.LoginName}`);

    //     // let permissions1;
    //     // try {
    //     //     // Attempt to get the item as a folder by path
    //     //     const folder= testidsub.web.getFolderByServerRelativePath(`${FolderPath}`);
    //     //     // Check if the folder exists
    //     //     const folderDetails = await folder.listItemAllFields.select("Id", "ParentListId")();
    //     //     const folderItemId = folderDetails.Id;
    //     //     const parentListId = folderDetails.ParentListId;
    //     //     const folderPermissions = await testidsub.web.lists
    //     //     .getById(parentListId)
    //     //     .items.getById(folderItemId)
    //     //     .getCurrentUserEffectivePermissions();
    //     //     permissions1=folderPermissions;
    //     //     console.log("Inside the try")
    //     //     console.log("folderPermissions",folderPermissions);
    //     //     // // permissions1 = await folder.listItemAllFields.getCurrentUserEffectivePermissions();
    //     //     // const folderItem = await folder.listItemAllFields.Id;
    //     //     // const permissions1 = await sp.web.lists.getById(folderItem.ParentList.Id).items.getById(folderItem.Id).getCurrentUserEffectivePermissions();
    //     //     console.log("Inside the try1")
    //     // } catch {
    //     //     // If folder fetch fails, assume it's a document library and get it as a list
    //     //     const library = testidsub.web.getList(`${FolderPath}`);
    //     //     console.log("Inside the catch")
    //     //     permissions1 = await library.getCurrentUserEffectivePermissions();
    //     //     console.log("Inside the catch1")
    //     // }

    //     // console.log("permission1",permissions1)

        

    //     // const folder = sp.web.getFolderByServerRelativePath(FolderPath);
 
    //     // Attempt to get the list item associated with the folder
    //     // const folderItem = await folder.listItemAllFields();
      
    //     // // Check if the folder has unique role assignments
    //     // const hasUniqueRoleAssignments = await folderItem.hasUniqueRoleAssignments();
      
    //     // if (hasUniqueRoleAssignments) {
    //     //     console.log(`Folder ${FolderPath} has unique permissions.`);
      
    //     //     // Get the role assignments for the folder
    //     //     const roleAssignments = await folderItem.roleAssignments.expand("Member", "RoleDefinitionBindings")();
      
    //     //     // Replace with the current user's email
    //     //     const currentUserEmail = "user@example.com"; // Get this dynamically based on your context
    //     //     let userPermissions = null;
      
    //     //     roleAssignments.forEach((roleAssignment:any) => {
    //     //         if (roleAssignment.Member.Email === currentUserEmail) {
    //     //             userPermissions = roleAssignment.RoleDefinitionBindings.map((role:any) => role.Name);
    //     //         }
    //     //     });
      
    //     //     if (userPermissions) {
    //     //         console.log(`User ${currentUserEmail} has the following permissions on folder ${FolderPath}:`, userPermissions);
    //     //     } else {
    //     //         console.log(`User ${currentUserEmail} does not have custom permissions on folder ${FolderPath}.`);
    //     //     }
    //     // } else {
    //     //     console.log(`Folder ${FolderPath} inherits permissions from its parent.`);
    //     // }
    //     // const folder = sp.web.getFolderByServerRelativePath(FolderPath);
 
    //     // // Get the folder item
    //     // const folderItem = await folder.listItemAllFields();
 
    //     // // Check if the folder has unique role assignments
    //     // const hasUniqueRoleAssignments = await folderItem.hasUniqueRoleAssignments();
 
    //     // if (hasUniqueRoleAssignments) {
    //     //     console.log(`Folder ${FolderPath} has unique permissions.`);
 
    //     //     // Get the role assignments for the folder
    //     //     const roleAssignments = await folderItem.roleAssignments.expand("Member", "RoleDefinitionBindings")();
 
    //     //     // Check the current user permissions
    //     //     const currentUserEmail = "user@example.com"; // Replace with the current user's email
    //     //     let userPermissions = null;
 
    //     //     roleAssignments.forEach((roleAssignment:any) => {
    //     //         if (roleAssignment.Member.Email === currentUserEmail) {
    //     //             userPermissions = roleAssignment.RoleDefinitionBindings.map((role:any )=> role.Name);
    //     //         }
    //     //     });
 
    //     //     if (userPermissions) {
    //     //         console.log(`User ${currentUserEmail} has the following permissions on folder ${FolderPath}:`, userPermissions);
    //     //     } else {
    //     //         console.log(`User ${currentUserEmail} does not have custom permissions on folder ${FolderPath}.`);
    //     //     }
    //     // } else {
    //     //     console.log(`Folder ${FolderPath} inherits permissions from its parent.`);
    //     // }


    //     // const folder = testidsub.web.getFolderByServerRelativePath(FolderPath);
    //     // const folderItem = await folder.getItem();
    //     // const permissions = await folderItem.getCurrentUserEffectivePermissions();
    //     //  console.log("permissions2",permissions);
    //     // const library1 = testidsub.web.getFolderByServerRelativePath(`${FolderPath}`);
    //     // const permissions = await library.expand('ListItemAllFields')();
    //     //  console.log("permissions1",permissions);

    //     // First, try to get the target as a folder
    //     // const folder = sp.web.getFolderByServerRelativePath(FolderPath);
    //     // const folderExists = await folder.exists();
    //     // const folderPermissions = await testidsub.web.getFolderByServerRelativePath(FolderPath).select(
    //     // "Name",
    //     // "ServerRelativeUrl",
    //     // "UniqueId",
    //     // "RoleAssignments/Member/Title",
    //     // "RoleAssignments/Member/PrincipalType",
    //     // "RoleAssignments/RoleDefinitionBindings/Name"
    //     // ).expand("RoleAssignments", "RoleAssignments/Member", "RoleAssignments/RoleDefinitionBindings")();
    //     // console.log("folderPermissions",folderPermissions.HasUniqueRoleAssignments());
    //     // let permission:string;
    //     // const library = testidsub.web.lists.getByTitle(docLibName);
    //     // const library = testidsub.web.getList(`${FolderPath}`);
    //     // const permissions = await library.getCurrentUserEffectivePermissions();
    //     // console.log("permissions",permissions);
         
    //     // Check for all permissions
    //   //   const userPermissions = {
    //   //     canViewPages: testidsub.web.hasPermissions(permissions, PermissionKind.ViewPages),
    //   //     canView: testidsub.web.hasPermissions(permissions, PermissionKind.ViewListItems),
    //   //     canEdit: testidsub.web.hasPermissions(permissions, PermissionKind.EditListItems),
    //   //     canAdd: testidsub.web.hasPermissions(permissions, PermissionKind.AddListItems),          
    //   //     canFullControl: testidsub.web.hasPermissions(permissions, PermissionKind.FullMask),
    //   //     // canDelete: testidsub.web.hasPermissions(permissions, PermissionKind.DeleteListItems),
    //   //     // canApprove: testidsub.web.hasPermissions(permissions, PermissionKind.ApproveItems),
    //   //     // canOpen: testidsub.web.hasPermissions(permissions, PermissionKind.OpenItems),
    //   //     // canViewVersions: testidsub.web.hasPermissions(permissions, PermissionKind.ViewVersions),
    //   //     // canDeleteVersions: testidsub.web.hasPermissions(permissions, PermissionKind.DeleteVersions),
    //   //     // canManagePermissions: testidsub.web.hasPermissions(permissions, PermissionKind.ManagePermissions),
    //   //     // canViewFormPages: testidsub.web.hasPermissions(permissions, PermissionKind.ViewFormPages),
    //   //     // canEditMyUserInfo: testidsub.web.hasPermissions(permissions, PermissionKind.EditMyUserInfo)
    //   // };
    //   // console.log("userPermissions",userPermissions);
    //   // Toggle the createFile button based on the permission
    //   // const createFileButton=document.getElementById("createFileButton");
    //   // if(permission === "Admin"){
      
    //     // }
    //   // End

    //   // Belong to admin or not start
    //   // const currentUser = await sp.web.currentUser();
    //   // const userGroups = await sp.web.siteUsers.getById(currentUser.Id).groups();
    //   // const isMemberOfGroup = userGroups.some(group => group.Title === `${currentEntity}_Admin`);
    //   // console.log(`Is member of ${currentEntity}_Admin:`, isMemberOfGroup);
    //   // if (isMemberOfGroup) {
    //   //        console.log(`User is a member of the group: ${currentEntity}_Admin`);
    //   //  } else {
    //   //        console.log(`User is not a member of the group: ${currentEntity}_Admin`);
    //   //  }
    //   // End

    //     const DMSEntityFileMasterList=`DMS${currentEntity}FileMaster`;
    //     console.log(DMSEntityFileMasterList);
        
    //     const filesData = await sp.web.lists
    //     .getByTitle(`${DMSEntityFileMasterList}`)
    //     .items.select("FileUID","IsFavourite")
    //     .filter(
    //       `IsFavourite eq 1 and CurrentUser eq '${currentUserEmailRef.current}'`
    //     )();
     
    //     // Create a map for quick lookup of IsFavourite status by FileUID
    //     const favouriteMap = new Map(
    //       filesData.map((item: any) => [item.FileUID, item.IsFavourite])
    //     );
      

    //     console.log("FavouriteMap",favouriteMap)
    //     console.log("Files", filesData);
     
    //     files.forEach(async(file:any) => {
    //           const isFavourite = favouriteMap.get(file.UniqueId) || 0;
    //           const favouriteText = isFavourite ? "Unmark as Favourite" : "Mark as Favourite";
         
    //           // Set display properties based on favorite status
    //           const displayPropertyforFillFavourite = isFavourite ? "block" : "none";
    //           const displayPropertyforUnFillFavourite = isFavourite ? "none" : "block";

    //           if(DMSPreviewFormMasterItems[0].IsHardDelete){
    //             // console.log("Hard Delete --->",DMSPreviewFormMasterItems[0].IsHardDelete);
    //             // if(file.ListItemAllFields.Status !== "Pending"){   
    //             //     // Function to get file icon
    //             //     const {fileIcon} = getFileIcon(file.Name);
    //             //     const card=createFileCardForDocumentLibrary(file,fileIcon,siteID,DMSPreviewFormMasterItems[0].IsHardDelete,docLibName,displayPropertyforUnFillFavourite,displayPropertyforFillFavourite,favouriteText,permission);
    //             //     container.appendChild(card);
    //             // }
    //           }else{
    //             console.log("soft delete ---->",DMSPreviewFormMasterItems[0].IsHardDelete);
    //             if(file.ListItemAllFields.IsDeleted === null){
    //               if(file.ListItemAllFields.Status !== "Pending"){
    //                 let permission=file.ListItemAllFields.Status; 
    //                 const {fileIcon} = getFileIcon(file.Name);
    //                 const card=createFileCardForDocumentLibrary(file,fileIcon,siteID,false,docLibName,displayPropertyforUnFillFavourite,displayPropertyforFillFavourite,favouriteText,permission,FolderPath,);
    //                 container.appendChild(card);
    //               }
    //             }
    //           }
               
              
    //       // if(DMSPreviewFormMasterItems[0].IsHardDelete){
    //       //   
    //       //   if(file.ListItemAllFields.Status !== "Pending"){
          
              
    //       //     const card = document.createElement("div");
    //       //     const {fileIcon} = getFileIcon(file.Name); // Function to get file icon
    //       //     card.className = "card";
    //       //     card.dataset.fileId = file.UniqueId; // Store file ID in the card element
    //       //     card.innerHTML = `        
    //       //         <img class="filextension" src=${fileIcon} alt="File icon"/>
    //       //         <p class="p1st">${file.Name}</p>
    //       //         <p class="p3rd">${((file.Length as unknown as number) / (1024 * 1024)).toFixed(2)} MB</p>
    //       //         <div id="three-dots" class="three-dots" onclick="toggleMenu2('${file.UniqueId}', '${siteID}')">
    //       //         <span>...</span>
    //       //         </div>
    //       //       `;
         
    //       //     const menu = document.createElement("div");
    //       //     menu.id = `menu-${file.UniqueId}`;
    //       //     menu.className = "popup-menu";
    //       //     menu.innerHTML = `
    //       //       <ul>
    //       //         <li onclick="confirmDeleteFile('${file.UniqueId}', '${siteID}','${DMSPreviewFormMasterItems[0].IsHardDelete}','${null}')">
    //       //         <img src=${deleteIcon} alt="Delete"/>
    //       //                     Delete
    //       //         </li>
    //       //         <li onclick="auditHistory('${file.UniqueId}', '${siteID}','${file.Name}')">
    //       //         <img src=${editIcon} alt="Edit"/>
    //       //                     Audit History
    //       //         </li>
    //       //         <li onclick="PreviewFile('${file.ServerRelativeUrl}', '${siteID}' , '${docLibName}')">
    //       //         <img src=${editIcon} alt="Preview"/>
    //       //                     Preview File
    //       //         </li>
    //       //         <li id="favouriteToggle-${file.UniqueId}" onclick="toggleFavourite('${file.UniqueId}', '${siteID}')">
    //       //         <img src=${UnFillFavouriteFile} alt="Mark as Favourite" class="mark-as-favourite" style="display:${displayPropertyforUnFillFavourite};"/>
    //       //         <img src=${FillFavouriteFile} alt="Unmark as Favourite" class="unmark-as-favourite" style="display:${displayPropertyforFillFavourite};"/>
    //       //         <span class="favourite-text">${favouriteText}</span>
    //       //         </li>  
    //       //       </ul>
    //       //     `;
    //       //     card.appendChild(menu);
    //       //     container.appendChild(card);
    //       //   }
           

    //       // }else{
    //       //   console.log("soft delete");
    //       //   if(file.ListItemAllFields.IsDeleted === null){
    //       //     if(file.ListItemAllFields.Status !== "Pending"){
    //       //       const isFavourite = favouriteMap.get(file.UniqueId) || 0;
    //       //       const favouriteText = isFavourite ? "Unmark as Favourite" : "Mark as Favourite";
           
    //       //       // Set display properties based on favorite status
    //       //       const displayPropertyforFillFavourite = isFavourite ? "block" : "none";
    //       //       const displayPropertyforUnFillFavourite = isFavourite ? "none" : "block";
                
    //       //       const card = document.createElement("div");
    //       //       const {fileIcon} = getFileIcon(file.Name); // Function to get file icon
    //       //       card.className = "card";
    //       //       card.dataset.fileId = file.UniqueId; // Store file ID in the card element
    //       //       card.innerHTML = `        
    //       //           <img class="filextension" src=${fileIcon} alt="File icon"/>
    //       //           <p class="p1st">${file.Name}</p>
    //       //           <p class="p3rd">${((file.Length as unknown as number) / (1024 * 1024)).toFixed(2)} MB</p>
    //       //           <div id="three-dots" class="three-dots" onclick="toggleMenu2('${file.UniqueId}', '${siteID}')">
    //       //           <span>...</span>
    //       //           </div>
    //       //         `;
           
    //       //       const menu = document.createElement("div");
    //       //       menu.id = `menu-${file.UniqueId}`;
    //       //       menu.className = "popup-menu";
    //       //       menu.innerHTML = `
    //       //         <ul>
    //       //           <li onclick="confirmDeleteFile('${file.UniqueId}', '${siteID}','${false}','${null}')">
    //       //           <img src=${deleteIcon} alt="Delete"/>
    //       //                       Delete
    //       //           </li>
    //       //           <li onclick="auditHistory('${file.UniqueId}', '${siteID}','${file.Name}')">
    //       //           <img src=${editIcon} alt="Edit"/>
    //       //                       Audit History
    //       //           </li>
    //       //           <li onclick="PreviewFile('${file.ServerRelativeUrl}', '${siteID}' , '${docLibName}')">
    //       //           <img src=${editIcon} alt="Preview"/>
    //       //                       Preview File
    //       //           </li>
    //       //           <li id="favouriteToggle-${file.UniqueId}" onclick="toggleFavourite('${file.UniqueId}', '${siteID}')">
    //       //           <img src=${UnFillFavouriteFile} alt="Mark as Favourite" class="mark-as-favourite" style="display:${displayPropertyforUnFillFavourite};"/>
    //       //           <img src=${FillFavouriteFile} alt="Unmark as Favourite" class="unmark-as-favourite" style="display:${displayPropertyforFillFavourite};"/>
    //       //           <span class="favourite-text">${favouriteText}</span>
    //       //           </li>  
    //       //         </ul>
    //       //       `;
    //       //       card.appendChild(menu);
    //       //       container.appendChild(card);
    //       //     }
    //       //   }
    //       // }


    //       // if(file.ListItemAllFields.IsDeleted === null){
    //       //   if(file.ListItemAllFields.Status !== "Pending"){
    //       //     const isFavourite = favouriteMap.get(file.UniqueId) || 0;
    //       //     const favouriteText = isFavourite ? "Unmark as Favourite" : "Mark as Favourite";
         
    //       //     // Set display properties based on favorite status
    //       //     const displayPropertyforFillFavourite = isFavourite ? "block" : "none";
    //       //     const displayPropertyforUnFillFavourite = isFavourite ? "none" : "block";
              
    //       //     const card = document.createElement("div");
    //       //     const {fileIcon} = getFileIcon(file.Name); // Function to get file icon
    //       //     card.className = "card";
    //       //     card.dataset.fileId = file.UniqueId; // Store file ID in the card element
    //       //     card.innerHTML = `        
    //       //         <img class="filextension" src=${fileIcon} alt="File icon"/>
    //       //         <p class="p1st">${file.Name}</p>
    //       //         <p class="p3rd">${((file.Length as unknown as number) / (1024 * 1024)).toFixed(2)} MB</p>
    //       //         <div id="three-dots" class="three-dots" onclick="toggleMenu2('${file.UniqueId}', '${siteID}')">
    //       //         <span>...</span>
    //       //         </div>
    //       //       `;
         
    //       //     const menu = document.createElement("div");
    //       //     menu.id = `menu-${file.UniqueId}`;
    //       //     menu.className = "popup-menu";
    //       //     menu.innerHTML = `
    //       //       <ul>
    //       //         <li onclick="confirmDeleteFile('${file.UniqueId}', '${siteID}')">
    //       //         <img src=${deleteIcon} alt="Delete"/>
    //       //                     Delete
    //       //         </li>
    //       //         <li onclick="auditHistory('${file.UniqueId}', '${siteID}','${file.Name}')">
    //       //         <img src=${editIcon} alt="Edit"/>
    //       //                     Audit History
    //       //         </li>
    //       //         <li onclick="PreviewFile('${file.ServerRelativeUrl}', '${siteID}' , '${docLibName}')">
    //       //         <img src=${editIcon} alt="Preview"/>
    //       //                     Preview File
    //       //         </li>
    //       //         <li id="favouriteToggle-${file.UniqueId}" onclick="toggleFavourite('${file.UniqueId}', '${siteID}')">
    //       //         <img src=${UnFillFavouriteFile} alt="Mark as Favourite" class="mark-as-favourite" style="display:${displayPropertyforUnFillFavourite};"/>
    //       //         <img src=${FillFavouriteFile} alt="Unmark as Favourite" class="unmark-as-favourite" style="display:${displayPropertyforFillFavourite};"/>
    //       //         <span class="favourite-text">${favouriteText}</span>
    //       //         </li>  
    //       //       </ul>
    //       //     `;
    //       //     card.appendChild(menu);
    //       //     container.appendChild(card);
    //       //   }
    //       // }
          
    //     });
    //   } catch (error) {
    //     console.error("Error fetching Doclib data:", error);
    //   }
      
    // };
    
// code to route to different document library and folder start
  useEffect(() => {
    // const params = new URLSearchParams(window.location.search);
    const url = window.location.href;
    // const matches = url.match(/\/([^\/]+)\.aspx/);
    let extractedPart = url.split('.aspx')[1]; 
    let parameters = extractedPart.split('?')
    // alert( parameters);
    console.log("parameters",parameters);
    let path="";
    let siteId="";
    let folderName="";
    let devision="";
    let department="";
    if(parameters.length>1){
    parameters.forEach((items,index)=>{
      console.log(`items[${index}]`,items)

      if(index ==1){
        if(items.includes('%20')){
          console.log("Clean Url")
          const cleanUrl = items.replace(/%20/g, ' '); 
          path=cleanUrl;
        }else{
          path=items;
        } 
        
      }
      if(index ==2){
        if(items.includes('%20')){
          console.log("Clean path")
          const cleanUrl = items.replace(/%20/g, ' '); 
          folderName=cleanUrl;
        }else{
          folderName=items;
        } 
        // folderName=items;
      }
      if(index ==3){
        siteId=items;
      }
      if(index == 4){
        if(items.includes('%20')){
          console.log("Clean devision")
          const cleanDevision = items.replace(/%20/g, ' '); 
          devision=cleanDevision;
        }else{
          devision=items;
        } 
      }
      if(index == 5){
        if(items.includes('%20')){
          console.log("Clean deaprtment")
          const cleanDepartment = items.replace(/%20/g, ' '); 
          department=cleanDepartment;
        }else{
          department=items;
        } 
      }
    })
    console.log("path",path)
    console.log("siteId",siteId)
    console.log("folderName",folderName)
    console.log("department",department)
    console.log("devision",devision)
    currentDepartment=department;
    currentDevision=devision;
    cleanUrlInMyRequest=true;
    getdoclibdata(path,siteId,folderName);
    }
    
  }, []);
  // end
    const getdoclibdata = async (FolderPath: any , siteID:any , docLibName:any) => {
      console.log('path   ', FolderPath)
      console.log('SiteID :    ', siteID)
      console.log('docLibName :    ', docLibName);
      console.log('currentEntity :    ', currentEntity);
      // Extract the current entity from url
      const segments = FolderPath.split('/');
      const currentSubsite = segments[3]; 
      console.log("segments",segments);
      console.log(currentSubsite);
      console.log("Devision",currentDevision);
      console.log("Department",currentDepartment);
      // set current entity ,current document library and folder name
      const folName = segments[segments.length - 1];
      if(folName === docLibName){
        console.log("its document libray",folName)
      }else{
        console.log("its folder",folName)
        currentFolder=folName
      }
      currentEntity=currentSubsite;
      currentDocumentLibrary=docLibName;
      // Update the url  start
      if(currentDevision !== ""){
        console.log("Devision present",currentDevision);
        if(currentDepartment !== ""){
          console.log("Department present",currentDepartment);
          const newUrl = `${window.location.origin}${window.location.pathname}?${FolderPath}?${docLibName}?${siteID}?${currentDevision}?${currentDepartment}`;
          window.history.pushState(null, '', newUrl);
        }else{
          const newUrl = `${window.location.origin}${window.location.pathname}?${FolderPath}?${docLibName}?${siteID}?${currentDevision}`;
          window.history.pushState(null, '', newUrl);
        }
      }else{
        const newUrl = `${window.location.origin}${window.location.pathname}?${FolderPath}?${docLibName}?${siteID}`;
        window.history.pushState(null, '', newUrl);
      }
      
      // end

      routeToDiffSideBar="";

      const testidsub = await sp.site.openWebById(siteID);
      let files:any = [];
      let batchSize = 5000;
      let nextLink = null;
      let hasMoreItems = true;
      currentsiteID=siteID;
      currentfolderpath=FolderPath;
      const container = document.getElementById("files-container");
      container.innerHTML = "";
      console.log("folderpath:", FolderPath);
      try {
        while (hasMoreItems) {
          let response;
          if (nextLink) {
            response = await sp.web(nextLink);
          } else {
            response = await testidsub.web
              .getFolderByServerRelativePath(FolderPath)
              .files.select("Name", "Length", "ServerRelativeUrl", "UniqueId","MajorVersion","ListItemAllFields/Status","ListItemAllFields/IsDeleted").expand("ListItemAllFields")
              .top(batchSize)();
              myfolderdata = response
              console.log(response , "response")
          }
          // Add the current batch of files to the files array
          files = [...files, ...response as IFileInfo[]];
          // Check if there is a nextLink for more items
          if ("@odata.nextLink" in response) {
            nextLink = response["@odata.nextLink"];
          } else {
            hasMoreItems = false; // No more items, exit loop
          }
        }
        console.log("All files fetched:", files);

        // Get the details of the users permission.
        // start
        // const library = testidsub.web.lists.getByTitle(docLibName);
        const library = testidsub.web.getList(`${FolderPath}`);
        const permissions = await library.getCurrentUserEffectivePermissions();
        // console.log("permissions",permissions);
         
        // Check for all permissions
      //   const userPermissions = {
      //     canViewPages: testidsub.web.hasPermissions(permissions, PermissionKind.ViewPages),
      //     canView: testidsub.web.hasPermissions(permissions, PermissionKind.ViewListItems),
      //     canEdit: testidsub.web.hasPermissions(permissions, PermissionKind.EditListItems),
      //     canAdd: testidsub.web.hasPermissions(permissions, PermissionKind.AddListItems),          
      //     canFullControl: testidsub.web.hasPermissions(permissions, PermissionKind.FullMask),
      //     canFullControl1: testidsub.web.hasPermissions(permissions, PermissionKind.ManagePermissions),
      //     canDelete: testidsub.web.hasPermissions(permissions, PermissionKind.DeleteListItems),
      //     canApprove: testidsub.web.hasPermissions(permissions, PermissionKind.ApproveItems),
      //     canOpen: testidsub.web.hasPermissions(permissions, PermissionKind.OpenItems),
      //     canViewVersions: testidsub.web.hasPermissions(permissions, PermissionKind.ViewVersions),
      //     canDeleteVersions: testidsub.web.hasPermissions(permissions, PermissionKind.DeleteVersions),
      //     canManagePermissions: testidsub.web.hasPermissions(permissions, PermissionKind.ManagePermissions),
      //     canViewFormPages: testidsub.web.hasPermissions(permissions, PermissionKind.ViewFormPages),
      //     canEditMyUserInfo: testidsub.web.hasPermissions(permissions, PermissionKind.EditMyUserInfo)
      // };
      const userPermissions = {
        hasFullControl: testidsub.web.hasPermissions(permissions, PermissionKind.FullMask) || testidsub.web.hasPermissions(permissions, PermissionKind.ManagePermissions),
        hasContribute: testidsub.web.hasPermissions(permissions, PermissionKind.AddListItems) &&
                       testidsub.web.hasPermissions(permissions, PermissionKind.EditListItems) &&
                       testidsub.web.hasPermissions(permissions, PermissionKind.DeleteListItems),
        hasEdit: testidsub.web.hasPermissions(permissions, PermissionKind.EditListItems),
        // hasEdit1: testidsub.web.hasPermissions(permissions, PermissionKind.),
        hasRead: testidsub.web.hasPermissions(permissions, PermissionKind.ViewListItems),
        hasView: testidsub.web.hasPermissions(permissions, PermissionKind.ViewPages)
      };
      console.log("userPermissions",userPermissions);
      // End

      // Belong to admin or not start
      // Toggle the createFile and createFolder button based on the permission
      // let permission:string;
      const createFileButton=document.getElementById("createFileButton");
      const createFileButton2=document.getElementById("createFileButton2");
      try {
        const currentUser = await sp.web.currentUser();
        const userGroups = await sp.web.siteUsers.getById(currentUser.Id).groups();
        const isMemberOfGroup = userGroups.some(group => group.Title === `${currentEntity}_Admin`);
        const isMemberOfContribute = userGroups.some(group => group.Title === `${currentEntity}_Contribute`);
        const isMemberOfInitiator = userGroups.some(group => group.Title === `${currentEntity}_Initiator`);
        const isMemberOfRead = userGroups.some(group => group.Title === `${currentEntity}_Read`);
        const isMemberOfView = userGroups.some(group => group.Title === `${currentEntity}_View`);
        const isMemberOfSuperAdmin = userGroups.some(group => group.Title === `DMSSuper_Admin`);
        console.log("isMemberOfSuperAdmin",isMemberOfSuperAdmin);
        console.log("isMemberOfContribute",isMemberOfContribute);
        console.log("isMemberOfInitiator",isMemberOfInitiator);
        console.log("isMemberOfRead",isMemberOfRead);
        console.log("isMemberOfView",isMemberOfView);
        console.log(`Is member of ${currentEntity}_Admin:`, isMemberOfGroup);
        // console.log(`User is a member of the group: ${currentEntity}_Admin`);
        if (isMemberOfGroup || isMemberOfSuperAdmin) {
          console.log(`User is a member of the group: ${currentEntity}_Admin`);
          if(createFileButton){
            createFileButton.style.display=  "block";
          }
          if(createFileButton2){
          createFileButton2.style.display="block";
          }
       }else if(isMemberOfContribute || isMemberOfInitiator || isMemberOfRead){
            if(createFileButton){
              createFileButton.style.display=  "block";
            }
            if(createFileButton2){
              createFileButton2.style.display="none";
              }
       }else {
        console.log(`User is not a member of the group: ${currentEntity}_Admin`);
        if(createFileButton){
          createFileButton.style.display="none";
        }
        if(createFileButton2){
          createFileButton2.style.display="none";
        }
       }
      } catch (error) {
        console.log(`User is not a member of the group: ${currentEntity}_Admin`);
        if(createFileButton){
          createFileButton.style.display="none";
        }
        if(createFileButton2){
          createFileButton2.style.display="none";
        }
   
       
      }
      // End
        const DMSEntityFileMasterList=`DMS${currentEntity}FileMaster`;
        console.log(DMSEntityFileMasterList);
        
        const filesData = await sp.web.lists
        .getByTitle(`${DMSEntityFileMasterList}`)
        .items.select("FileUID","IsFavourite")
        .filter(
          `IsFavourite eq 1 and CurrentUser eq '${currentUserEmailRef.current}'`
        )();
     
        // Create a map for quick lookup of IsFavourite status by FileUID
        const favouriteMap = new Map(
          filesData.map((item: any) => [item.FileUID, item.IsFavourite])
        );
      

        // console.log("FavouriteMap",favouriteMap)
        console.log("Files", filesData);
        // Add breadCrumb start
        handleNavigation(currentSubsite,currentDevision , currentDepartment ,  currentDocumentLibrary, currentFolder);
        // End
        const container = document.getElementById("files-container");
        container.innerHTML = "";
        files.forEach(async(file:any) => {
              const isFavourite = favouriteMap.get(file.UniqueId) || 0;
              const favouriteText = isFavourite ? "Unmark as Favourite" : "Mark as Favourite";
         
              // Set display properties based on favorite status
              const displayPropertyforFillFavourite = isFavourite ? "block" : "none";
              const displayPropertyforUnFillFavourite = isFavourite ? "none" : "block";
              
              if(file.ListItemAllFields.IsDeleted === null){
                  if(file.ListItemAllFields.Status !== "Pending"){
                    let permission=file.ListItemAllFields.Status; 
                    const {fileIcon} = getFileIcon(file.Name);
                    const card=createFileCardForDocumentLibrary(file,fileIcon,siteID,false,docLibName,displayPropertyforUnFillFavourite,displayPropertyforFillFavourite,favouriteText,permission,FolderPath,);
                    container.appendChild(card);
                  }
                }
        });
      } catch (error) {
        console.error("Error fetching Doclib data:", error);
      }
      
    };
    // const getdoclibdata = async (FolderPath: any , siteID:any , docLibName:any) => {
    //   console.log('path   ', FolderPath)
    //   console.log('SiteID :    ', siteID)
    //   console.log('docLibName :    ', docLibName);
    //   console.log('currentEntity :    ', currentEntity);
    //   // Extract the current entity from url
    //   const segments = FolderPath.split('/');
    //   const currentSubsite = segments[3]; 
    //   console.log("segments",segments);
    //   console.log(currentSubsite);
    //   console.log("Devision",currentDevision);
    //   console.log("Department",currentDepartment);
    //   // set current entity ,current document library and folder name
    //   const folName = segments[segments.length - 1];
    //   if(folName === docLibName){
    //     console.log("its document libray",folName)
    //   }else{
    //     console.log("its folder",folName)
    //     currentFolder=folName
    //   }
    //   currentEntity=currentSubsite;
    //   currentDocumentLibrary=docLibName;
    //   // Update the url  start
    //   if(currentDevision !== ""){
    //     console.log("Devision present",currentDevision);
    //     if(currentDepartment !== ""){
    //       console.log("Department present",currentDepartment);
    //       const newUrl = `${window.location.origin}${window.location.pathname}?${FolderPath}?${docLibName}?${siteID}?${currentDevision}?${currentDepartment}`;
    //       window.history.pushState(null, '', newUrl);
    //     }else{
    //       const newUrl = `${window.location.origin}${window.location.pathname}?${FolderPath}?${docLibName}?${siteID}?${currentDevision}`;
    //       window.history.pushState(null, '', newUrl);
    //     }
    //   }else{
    //     const newUrl = `${window.location.origin}${window.location.pathname}?${FolderPath}?${docLibName}?${siteID}`;
    //     window.history.pushState(null, '', newUrl);
    //   }
      
    //   // end

    //   routeToDiffSideBar="";

    //   const testidsub = await sp.site.openWebById(siteID);
    //   let files:any = [];
    //   let batchSize = 5000;
    //   let nextLink = null;
    //   let hasMoreItems = true;
    //   currentsiteID=siteID;
    //   currentfolderpath=FolderPath;
    //   const container = document.getElementById("files-container");
    //   container.innerHTML = "";
    //   console.log("folderpath:", FolderPath);
    //   try {
    //     while (hasMoreItems) {
    //       let response;
    //       if (nextLink) {
    //         response = await sp.web(nextLink);
    //       } else {
    //         response = await testidsub.web
    //           .getFolderByServerRelativePath(FolderPath)
    //           .files.select("Name", "Length", "ServerRelativeUrl", "UniqueId","MajorVersion","ListItemAllFields/Status","ListItemAllFields/IsDeleted").expand("ListItemAllFields")
    //           .top(batchSize)();
    //           myfolderdata = response
    //           console.log(response , "response")
    //       }
    //       // Add the current batch of files to the files array
    //       files = [...files, ...response as IFileInfo[]];
    //       // Check if there is a nextLink for more items
    //       if ("@odata.nextLink" in response) {
    //         nextLink = response["@odata.nextLink"];
    //       } else {
    //         hasMoreItems = false; // No more items, exit loop
    //       }
    //     }
    //     console.log("All files fetched:", files);

    //     // Get the details of the users permission.
    //     // start
    //     // const library = testidsub.web.lists.getByTitle(docLibName);
    //     const library = testidsub.web.getList(`${FolderPath}`);
    //     const permissions = await library.getCurrentUserEffectivePermissions();
    //     // console.log("permissions",permissions);
         
    //     // Check for all permissions
    //   //   const userPermissions = {
    //   //     canViewPages: testidsub.web.hasPermissions(permissions, PermissionKind.ViewPages),
    //   //     canView: testidsub.web.hasPermissions(permissions, PermissionKind.ViewListItems),
    //   //     canEdit: testidsub.web.hasPermissions(permissions, PermissionKind.EditListItems),
    //   //     canAdd: testidsub.web.hasPermissions(permissions, PermissionKind.AddListItems),          
    //   //     canFullControl: testidsub.web.hasPermissions(permissions, PermissionKind.FullMask),
    //   //     canFullControl1: testidsub.web.hasPermissions(permissions, PermissionKind.ManagePermissions),
    //   //     canDelete: testidsub.web.hasPermissions(permissions, PermissionKind.DeleteListItems),
    //   //     canApprove: testidsub.web.hasPermissions(permissions, PermissionKind.ApproveItems),
    //   //     canOpen: testidsub.web.hasPermissions(permissions, PermissionKind.OpenItems),
    //   //     canViewVersions: testidsub.web.hasPermissions(permissions, PermissionKind.ViewVersions),
    //   //     canDeleteVersions: testidsub.web.hasPermissions(permissions, PermissionKind.DeleteVersions),
    //   //     canManagePermissions: testidsub.web.hasPermissions(permissions, PermissionKind.ManagePermissions),
    //   //     canViewFormPages: testidsub.web.hasPermissions(permissions, PermissionKind.ViewFormPages),
    //   //     canEditMyUserInfo: testidsub.web.hasPermissions(permissions, PermissionKind.EditMyUserInfo)
    //   // };
    //   const userPermissions = {
    //     hasFullControl: testidsub.web.hasPermissions(permissions, PermissionKind.FullMask) || testidsub.web.hasPermissions(permissions, PermissionKind.ManagePermissions),
    //     hasContribute: testidsub.web.hasPermissions(permissions, PermissionKind.AddListItems) &&
    //                    testidsub.web.hasPermissions(permissions, PermissionKind.EditListItems) &&
    //                    testidsub.web.hasPermissions(permissions, PermissionKind.DeleteListItems),
    //     hasEdit: testidsub.web.hasPermissions(permissions, PermissionKind.EditListItems),
    //     // hasEdit1: testidsub.web.hasPermissions(permissions, PermissionKind.),
    //     hasRead: testidsub.web.hasPermissions(permissions, PermissionKind.ViewListItems),
    //     hasView: testidsub.web.hasPermissions(permissions, PermissionKind.ViewPages)
    //   };
    //   console.log("userPermissions",userPermissions);
    //   // End

    //   // Belong to admin or not start
    //   // Toggle the createFile and createFolder button based on the permission
    //   // let permission:string;
    //   const createFileButton=document.getElementById("createFileButton");
    //   const createFileButton2=document.getElementById("createFileButton2");
    //   try {
    //     const currentUser = await sp.web.currentUser();
    //     const userGroups = await sp.web.siteUsers.getById(currentUser.Id).groups();
    //     const isMemberOfGroup = userGroups.some(group => group.Title === `${currentEntity}_Admin`);
    //     const isMemberOfContribute = userGroups.some(group => group.Title === `${currentEntity}_Contribute`);
    //     const isMemberOfInitiator = userGroups.some(group => group.Title === `${currentEntity}_Initiator`);
    //     const isMemberOfRead = userGroups.some(group => group.Title === `${currentEntity}_Read`);
    //     const isMemberOfView = userGroups.some(group => group.Title === `${currentEntity}_View`);
    //     const isMemberOfSuperAdmin = userGroups.some(group => group.Title === `DMSSuper_Admin`);
    //     console.log("isMemberOfSuperAdmin",isMemberOfSuperAdmin);
    //     console.log("isMemberOfContribute",isMemberOfContribute);
    //     console.log("isMemberOfInitiator",isMemberOfInitiator);
    //     console.log("isMemberOfRead",isMemberOfRead);
    //     console.log("isMemberOfView",isMemberOfView);
    //     console.log(`Is member of ${currentEntity}_Admin:`, isMemberOfGroup);
    //     // console.log(`User is a member of the group: ${currentEntity}_Admin`);
    //     if (isMemberOfGroup || isMemberOfSuperAdmin) {
    //       console.log(`User is a member of the group: ${currentEntity}_Admin`);
    //       if(createFileButton){
    //         createFileButton.style.display=  "block";
    //       }
    //       if(createFileButton2){
    //       createFileButton2.style.display="block";
    //       }
    //    }else if(isMemberOfContribute || isMemberOfInitiator || isMemberOfRead){
    //         if(createFileButton){
    //           createFileButton.style.display=  "block";
    //         }
    //         if(createFileButton2){
    //           createFileButton2.style.display="none";
    //           }
    //    }else {
    //     console.log(`User is not a member of the group: ${currentEntity}_Admin`);
    //     if(createFileButton){
    //       createFileButton.style.display="none";
    //     }
    //     if(createFileButton2){
    //       createFileButton2.style.display="none";
    //     }
    //    }
    //   } catch (error) {
    //     console.log(`User is not a member of the group: ${currentEntity}_Admin`);
    //     if(createFileButton){
    //       createFileButton.style.display="none";
    //     }
    //     if(createFileButton2){
    //       createFileButton2.style.display="none";
    //     }
   
       
    //   }
    //   // End
    //     const DMSEntityFileMasterList=`DMS${currentEntity}FileMaster`;
    //     console.log(DMSEntityFileMasterList);
        
    //     const filesData = await sp.web.lists
    //     .getByTitle(`${DMSEntityFileMasterList}`)
    //     .items.select("FileUID","IsFavourite")
    //     .filter(
    //       `IsFavourite eq 1 and CurrentUser eq '${currentUserEmailRef.current}'`
    //     )();
     
    //     // Create a map for quick lookup of IsFavourite status by FileUID
    //     const favouriteMap = new Map(
    //       filesData.map((item: any) => [item.FileUID, item.IsFavourite])
    //     );
      

    //     // console.log("FavouriteMap",favouriteMap)
    //     console.log("Files", filesData);
    //     // Add breadCrumb start
    //     handleNavigation(currentSubsite,currentDevision , currentDepartment ,  currentDocumentLibrary, currentFolder);
    //     // End
    //     const container = document.getElementById("files-container");
    //     container.innerHTML = "";
    //     files.forEach(async(file:any) => {
    //           const isFavourite = favouriteMap.get(file.UniqueId) || 0;
    //           const favouriteText = isFavourite ? "Unmark as Favourite" : "Mark as Favourite";
         
    //           // Set display properties based on favorite status
    //           const displayPropertyforFillFavourite = isFavourite ? "block" : "none";
    //           const displayPropertyforUnFillFavourite = isFavourite ? "none" : "block";
              
    //           if(file.ListItemAllFields.IsDeleted === null){
    //               if(file.ListItemAllFields.Status !== "Pending"){
    //                 let permission=file.ListItemAllFields.Status; 
    //                 const {fileIcon} = getFileIcon(file.Name);
    //                 const card=createFileCardForDocumentLibrary(file,fileIcon,siteID,false,docLibName,displayPropertyforUnFillFavourite,displayPropertyforFillFavourite,favouriteText,permission,FolderPath,);
    //                 container.appendChild(card);
    //               }
    //             }
    //     });
    //   } catch (error) {
    //     console.error("Error fetching Doclib data:", error);
    //   }
      
    // };
    // const getdoclibdata = async (FolderPath: any , siteID:any , docLibName:any) => {
    //   console.log('path   ', FolderPath)
    //   console.log('SiteID :    ', siteID)
    //   routeToDiffSideBar="";
   
    //   const testidsub = await sp.site.openWebById(siteID);
    //   let files:any = [];
    //   let batchSize = 5000;
    //   let nextLink = null;
    //   let hasMoreItems = true;
    //   currentsiteID=siteID;
    //   currentfolderpath=FolderPath;
    //   const container = document.getElementById("files-container");
    //   container.innerHTML = "";
    //   console.log("folderpath:", FolderPath);
    //   try {
    //     while (hasMoreItems) {
    //       let response;
    //       if (nextLink) {
    //         response = await sp.web(nextLink);
    //       } else {
    //         response = await testidsub.web
    //           .getFolderByServerRelativePath(FolderPath)
    //           .files.select("Name", "Length", "ServerRelativeUrl", "UniqueId","MajorVersion","ListItemAllFields/Status","ListItemAllFields/IsDeleted").expand("ListItemAllFields")
    //           .top(batchSize)();
    //           myfolderdata = response
    //           console.log(response , "response")
    //       }
    //       // Add the current batch of files to the files array
    //       files = [...files, ...response as IFileInfo[]];
    //       // Check if there is a nextLink for more items
    //       if ("@odata.nextLink" in response) {
    //         nextLink = response["@odata.nextLink"];
    //       } else {
    //         hasMoreItems = false; // No more items, exit loop
    //       }
    //     }
    //     console.log("All files fetched:", files);

    //     // Now process the files
    //     // const container = document.getElementById("files-container");
    //     // container.innerHTML = "";
        
    //     // start
    //     // Check if folder is private/public and also check it`s soft/hard delete.
    //     // Filter the list by the document library name
    //     const DMSPreviewFormMasterItems= await sp.web.lists.getByTitle('DMSPreviewFormMaster').items.filter(` DocumentLibraryName eq '${currentDocumentLibrary}' and SiteName eq '${currentEntity}' and IsDocumentLibrary eq 1`)();
    //     console.log(`DMSPreviewFormMaster -> ${currentDocumentLibrary} values`, DMSPreviewFormMasterItems)
    //     // end

    //     // Get the details of the users permission.
    //     // start
    //     // const library = testidsub.web.lists.getByTitle(docLibName);
    //     // const library = testidsub.web.getList(`${FolderPath}`);
    //     // const permissions = await library.getCurrentUserEffectivePermissions();
    //     // console.log("permissions",permissions);
         
    //     // Check for all permissions
    //     // const userPermissions = {
    //       // canViewPages: testidsub.web.hasPermissions(permissions, PermissionKind.ViewPages),
    //       // canView: testidsub.web.hasPermissions(permissions, PermissionKind.ViewListItems),
    //       // canEdit: testidsub.web.hasPermissions(permissions, PermissionKind.EditListItems),
    //       // canAdd: testidsub.web.hasPermissions(permissions, PermissionKind.AddListItems),          
    //       // canFullControl: testidsub.web.hasPermissions(permissions, PermissionKind.FullMask),
    //       // canDelete: testidsub.web.hasPermissions(permissions, PermissionKind.DeleteListItems),
    //       // canApprove: testidsub.web.hasPermissions(permissions, PermissionKind.ApproveItems),
    //       // canOpen: testidsub.web.hasPermissions(permissions, PermissionKind.OpenItems),
    //       // canViewVersions: testidsub.web.hasPermissions(permissions, PermissionKind.ViewVersions),
    //       // canDeleteVersions: testidsub.web.hasPermissions(permissions, PermissionKind.DeleteVersions),
    //       // canManagePermissions: testidsub.web.hasPermissions(permissions, PermissionKind.ManagePermissions),
    //       // canViewFormPages: testidsub.web.hasPermissions(permissions, PermissionKind.ViewFormPages),
    //       // canEditMyUserInfo: testidsub.web.hasPermissions(permissions, PermissionKind.EditMyUserInfo)
    //   // };
    //   // console.log("userPermissions",userPermissions);
    //   // End

    //   // Belong to admin or not start
    //   // Toggle the createFile and createFolder button based on the permission
    //   const createFileButton=document.getElementById("createFileButton");
    //   const createFolder=document.getElementById("createFileButton2");
    //   // let permission:string;
    //   try {
    //     const currentUser = await sp.web.currentUser();
    //     const userGroups = await sp.web.siteUsers.getById(currentUser.Id).groups();
    //     const isMemberOfGroup = userGroups.some(group => group.Title === `${currentEntity}_Admin`);
    //     const isMemberOfSuperAdmin = userGroups.some(group => group.Title === `DMSSuper_Admin`);
    //     console.log("isMemberOfSuperAdmin",isMemberOfSuperAdmin);
    //     console.log(`Is member of ${currentEntity}_Admin:`, isMemberOfGroup);
    //     // console.log(`User is a member of the group: ${currentEntity}_Admin`);
    //     if (isMemberOfGroup || isMemberOfSuperAdmin) {
    //     console.log(`User is a member of the group: ${currentEntity}_Admin`);
    //     if(createFileButton){
    //       createFileButton.style.display=  "block";
    //     }
    //     if(createFileButton2){
    //     createFileButton2.style.display="block";
    //     }
    //    }else {
    //       console.log(`User is not a member of the group: ${currentEntity}_Admin`);
    //       if(createFileButton){
    //         createFileButton.style.display="none";
    //       }
    //       if(createFileButton2){
    //         createFileButton2.style.display="none";
    //       }
        
    
    //      }
    //   } catch (error) {
    //     console.log(`User is not a member of the group: ${currentEntity}_Admin`);
    //     if(createFileButton){
    //       createFileButton.style.display="none";
    //     }
    //     if(createFileButton2){
    //       createFileButton2.style.display="none";
    //     }
    
       
    //   }
    //   // const currentUser = await sp.web.currentUser();
    //   // const userGroups = await sp.web.siteUsers.getById(currentUser.Id).groups();
    //   // const isMemberOfGroup = userGroups.some(group => group.Title === `${currentEntity}_Admin`);
    //   // console.log(`Is member of ${currentEntity}_Admin:`, isMemberOfGroup);
    //   // if (isMemberOfGroup) {
    //   //   // permission="Admin"
    //   //   console.log(`User is a member of the group: ${currentEntity}_Admin`);
    //   //   createFileButton.style.display="block";
    //   //   createFileButton2.style.display="block";
    //   //  } else {
    //   //   console.log(`User is not a member of the group: ${currentEntity}_Admin`);
    //   //   createFileButton.style.display="none";
    //   //   createFileButton2.style.display="none";
    //   //  }
    //   // End

    //     const DMSEntityFileMasterList=`DMS${currentEntity}FileMaster`;
    //     console.log(DMSEntityFileMasterList);
        
    //     const filesData = await sp.web.lists
    //     .getByTitle(`${DMSEntityFileMasterList}`)
    //     .items.select("FileUID","IsFavourite")
    //     .filter(
    //       `IsFavourite eq 1 and CurrentUser eq '${currentUserEmailRef.current}'`
    //     )();
     
    //     // Create a map for quick lookup of IsFavourite status by FileUID
    //     const favouriteMap = new Map(
    //       filesData.map((item: any) => [item.FileUID, item.IsFavourite])
    //     );
      

    //     // console.log("FavouriteMap",favouriteMap)
    //     console.log("Files", filesData);
     
    //     files.forEach(async(file:any) => {
    //           const isFavourite = favouriteMap.get(file.UniqueId) || 0;
    //           const favouriteText = isFavourite ? "Unmark as Favourite" : "Mark as Favourite";
         
    //           // Set display properties based on favorite status
    //           const displayPropertyforFillFavourite = isFavourite ? "block" : "none";
    //           const displayPropertyforUnFillFavourite = isFavourite ? "none" : "block";

    //           if(DMSPreviewFormMasterItems[0].IsHardDelete){
    //             // console.log("Hard Delete --->",DMSPreviewFormMasterItems[0].IsHardDelete);
    //             // if(file.ListItemAllFields.Status !== "Pending"){   
    //             //     // Function to get file icon
    //             //     const {fileIcon} = getFileIcon(file.Name);
    //             //     const card=createFileCardForDocumentLibrary(file,fileIcon,siteID,DMSPreviewFormMasterItems[0].IsHardDelete,docLibName,displayPropertyforUnFillFavourite,displayPropertyforFillFavourite,favouriteText,permission);
    //             //     container.appendChild(card);
    //             // }
    //           }else{
    //             // console.log("soft delete ---->",DMSPreviewFormMasterItems[0].IsHardDelete);
    //             if(file.ListItemAllFields.IsDeleted === null){
    //               if(file.ListItemAllFields.Status !== "Pending"){
    //                 let permission=file.ListItemAllFields.Status; 
    //                 const {fileIcon} = getFileIcon(file.Name);
    //                 const card=createFileCardForDocumentLibrary(file,fileIcon,siteID,false,docLibName,displayPropertyforUnFillFavourite,displayPropertyforFillFavourite,favouriteText,permission,FolderPath,);
    //                 container.appendChild(card);
    //               }
    //             }
    //           }
               
              
    //       // if(DMSPreviewFormMasterItems[0].IsHardDelete){
    //       //   
    //       //   if(file.ListItemAllFields.Status !== "Pending"){
          
              
    //       //     const card = document.createElement("div");
    //       //     const {fileIcon} = getFileIcon(file.Name); // Function to get file icon
    //       //     card.className = "card";
    //       //     card.dataset.fileId = file.UniqueId; // Store file ID in the card element
    //       //     card.innerHTML = `        
    //       //         <img class="filextension" src=${fileIcon} alt="File icon"/>
    //       //         <p class="p1st">${file.Name}</p>
    //       //         <p class="p3rd">${((file.Length as unknown as number) / (1024 * 1024)).toFixed(2)} MB</p>
    //       //         <div id="three-dots" class="three-dots" onclick="toggleMenu2('${file.UniqueId}', '${siteID}')">
    //       //         <span>...</span>
    //       //         </div>
    //       //       `;
         
    //       //     const menu = document.createElement("div");
    //       //     menu.id = `menu-${file.UniqueId}`;
    //       //     menu.className = "popup-menu";
    //       //     menu.innerHTML = `
    //       //       <ul>
    //       //         <li onclick="confirmDeleteFile('${file.UniqueId}', '${siteID}','${DMSPreviewFormMasterItems[0].IsHardDelete}','${null}')">
    //       //         <img src=${deleteIcon} alt="Delete"/>
    //       //                     Delete
    //       //         </li>
    //       //         <li onclick="auditHistory('${file.UniqueId}', '${siteID}','${file.Name}')">
    //       //         <img src=${editIcon} alt="Edit"/>
    //       //                     Audit History
    //       //         </li>
    //       //         <li onclick="PreviewFile('${file.ServerRelativeUrl}', '${siteID}' , '${docLibName}')">
    //       //         <img src=${editIcon} alt="Preview"/>
    //       //                     Preview File
    //       //         </li>
    //       //         <li id="favouriteToggle-${file.UniqueId}" onclick="toggleFavourite('${file.UniqueId}', '${siteID}')">
    //       //         <img src=${UnFillFavouriteFile} alt="Mark as Favourite" class="mark-as-favourite" style="display:${displayPropertyforUnFillFavourite};"/>
    //       //         <img src=${FillFavouriteFile} alt="Unmark as Favourite" class="unmark-as-favourite" style="display:${displayPropertyforFillFavourite};"/>
    //       //         <span class="favourite-text">${favouriteText}</span>
    //       //         </li>  
    //       //       </ul>
    //       //     `;
    //       //     card.appendChild(menu);
    //       //     container.appendChild(card);
    //       //   }
           

    //       // }else{
    //       //   console.log("soft delete");
    //       //   if(file.ListItemAllFields.IsDeleted === null){
    //       //     if(file.ListItemAllFields.Status !== "Pending"){
    //       //       const isFavourite = favouriteMap.get(file.UniqueId) || 0;
    //       //       const favouriteText = isFavourite ? "Unmark as Favourite" : "Mark as Favourite";
           
    //       //       // Set display properties based on favorite status
    //       //       const displayPropertyforFillFavourite = isFavourite ? "block" : "none";
    //       //       const displayPropertyforUnFillFavourite = isFavourite ? "none" : "block";
                
    //       //       const card = document.createElement("div");
    //       //       const {fileIcon} = getFileIcon(file.Name); // Function to get file icon
    //       //       card.className = "card";
    //       //       card.dataset.fileId = file.UniqueId; // Store file ID in the card element
    //       //       card.innerHTML = `        
    //       //           <img class="filextension" src=${fileIcon} alt="File icon"/>
    //       //           <p class="p1st">${file.Name}</p>
    //       //           <p class="p3rd">${((file.Length as unknown as number) / (1024 * 1024)).toFixed(2)} MB</p>
    //       //           <div id="three-dots" class="three-dots" onclick="toggleMenu2('${file.UniqueId}', '${siteID}')">
    //       //           <span>...</span>
    //       //           </div>
    //       //         `;
           
    //       //       const menu = document.createElement("div");
    //       //       menu.id = `menu-${file.UniqueId}`;
    //       //       menu.className = "popup-menu";
    //       //       menu.innerHTML = `
    //       //         <ul>
    //       //           <li onclick="confirmDeleteFile('${file.UniqueId}', '${siteID}','${false}','${null}')">
    //       //           <img src=${deleteIcon} alt="Delete"/>
    //       //                       Delete
    //       //           </li>
    //       //           <li onclick="auditHistory('${file.UniqueId}', '${siteID}','${file.Name}')">
    //       //           <img src=${editIcon} alt="Edit"/>
    //       //                       Audit History
    //       //           </li>
    //       //           <li onclick="PreviewFile('${file.ServerRelativeUrl}', '${siteID}' , '${docLibName}')">
    //       //           <img src=${editIcon} alt="Preview"/>
    //       //                       Preview File
    //       //           </li>
    //       //           <li id="favouriteToggle-${file.UniqueId}" onclick="toggleFavourite('${file.UniqueId}', '${siteID}')">
    //       //           <img src=${UnFillFavouriteFile} alt="Mark as Favourite" class="mark-as-favourite" style="display:${displayPropertyforUnFillFavourite};"/>
    //       //           <img src=${FillFavouriteFile} alt="Unmark as Favourite" class="unmark-as-favourite" style="display:${displayPropertyforFillFavourite};"/>
    //       //           <span class="favourite-text">${favouriteText}</span>
    //       //           </li>  
    //       //         </ul>
    //       //       `;
    //       //       card.appendChild(menu);
    //       //       container.appendChild(card);
    //       //     }
    //       //   }
    //       // }


    //       // if(file.ListItemAllFields.IsDeleted === null){
    //       //   if(file.ListItemAllFields.Status !== "Pending"){
    //       //     const isFavourite = favouriteMap.get(file.UniqueId) || 0;
    //       //     const favouriteText = isFavourite ? "Unmark as Favourite" : "Mark as Favourite";
         
    //       //     // Set display properties based on favorite status
    //       //     const displayPropertyforFillFavourite = isFavourite ? "block" : "none";
    //       //     const displayPropertyforUnFillFavourite = isFavourite ? "none" : "block";
              
    //       //     const card = document.createElement("div");
    //       //     const {fileIcon} = getFileIcon(file.Name); // Function to get file icon
    //       //     card.className = "card";
    //       //     card.dataset.fileId = file.UniqueId; // Store file ID in the card element
    //       //     card.innerHTML = `        
    //       //         <img class="filextension" src=${fileIcon} alt="File icon"/>
    //       //         <p class="p1st">${file.Name}</p>
    //       //         <p class="p3rd">${((file.Length as unknown as number) / (1024 * 1024)).toFixed(2)} MB</p>
    //       //         <div id="three-dots" class="three-dots" onclick="toggleMenu2('${file.UniqueId}', '${siteID}')">
    //       //         <span>...</span>
    //       //         </div>
    //       //       `;
         
    //       //     const menu = document.createElement("div");
    //       //     menu.id = `menu-${file.UniqueId}`;
    //       //     menu.className = "popup-menu";
    //       //     menu.innerHTML = `
    //       //       <ul>
    //       //         <li onclick="confirmDeleteFile('${file.UniqueId}', '${siteID}')">
    //       //         <img src=${deleteIcon} alt="Delete"/>
    //       //                     Delete
    //       //         </li>
    //       //         <li onclick="auditHistory('${file.UniqueId}', '${siteID}','${file.Name}')">
    //       //         <img src=${editIcon} alt="Edit"/>
    //       //                     Audit History
    //       //         </li>
    //       //         <li onclick="PreviewFile('${file.ServerRelativeUrl}', '${siteID}' , '${docLibName}')">
    //       //         <img src=${editIcon} alt="Preview"/>
    //       //                     Preview File
    //       //         </li>
    //       //         <li id="favouriteToggle-${file.UniqueId}" onclick="toggleFavourite('${file.UniqueId}', '${siteID}')">
    //       //         <img src=${UnFillFavouriteFile} alt="Mark as Favourite" class="mark-as-favourite" style="display:${displayPropertyforUnFillFavourite};"/>
    //       //         <img src=${FillFavouriteFile} alt="Unmark as Favourite" class="unmark-as-favourite" style="display:${displayPropertyforFillFavourite};"/>
    //       //         <span class="favourite-text">${favouriteText}</span>
    //       //         </li>  
    //       //       </ul>
    //       //     `;
    //       //     card.appendChild(menu);
    //       //     container.appendChild(card);
    //       //   }
    //       // }
          
    //     });
    //   } catch (error) {
    //     console.error("Error fetching Doclib data:", error);
    //   }
      
    // };
    // const getdoclibdata = async (FolderPath: any , siteID:any , docLibName:any) => {
    //   // event.preventDefault()
    //   // event.stopPropagation()
    //   // setlistorgriddata('')
    //   // setShowMyrequButtons(false)
    //   // setShowMyfavButtons(false)
    //   console.log('path   ', FolderPath)
    //   console.log('SiteID :    ', siteID)
      
    //   // start
    //   // Empty the routeToDiffSideBar
    //   routeToDiffSideBar="";
    //   // end  

    //   const testidsub = await sp.site.openWebById(siteID);
    //   let files:any = [];
    //   let batchSize = 5000;
    //   let nextLink = null;
    //   let hasMoreItems = true;
    //   currentsiteID=siteID;
    //   currentfolderpath=FolderPath;
    //   const container = document.getElementById("files-container");
    //   container.innerHTML = "";
    //   console.log("folderpath:", FolderPath);
    //   try {
    //     while (hasMoreItems) {
    //       let response;
    //       if (nextLink) {
    //         response = await sp.web(nextLink);
    //       } else {
    //         response = await testidsub.web
    //           .getFolderByServerRelativePath(FolderPath)
    //           .files.select("Name", "Length", "ServerRelativeUrl", "UniqueId","MajorVersion","ListItemAllFields/Status","ListItemAllFields/IsDeleted").expand("ListItemAllFields")
    //           .top(batchSize)();
    //           myfolderdata = response
    //           console.log(response , "response")
    //       }
    //       // Add the current batch of files to the files array
    //       files = [...files, ...response as IFileInfo[]];
    //       // Check if there is a nextLink for more items
    //       if ("@odata.nextLink" in response) {
    //         nextLink = response["@odata.nextLink"];
    //       } else {
    //         hasMoreItems = false; // No more items, exit loop
    //       }
    //     }
    //     console.log("All files fetched:", files);

    //     // Now process the files
    //     // const container = document.getElementById("files-container");
    //     // container.innerHTML = "";
        
    //     // start
    //     // Check if folder is private/public and also check it`s soft/hard delete.
    //     // Filter the list by the document library name
    //     const DMSPreviewFormMasterItems= await sp.web.lists.getByTitle('DMSPreviewFormMaster').items.filter(` DocumentLibraryName eq '${currentDocumentLibrary}' and SiteName eq '${currentEntity}' and IsDocumentLibrary eq 1`)();
    //     console.log(`DMSPreviewFormMaster -> ${currentDocumentLibrary} values`, DMSPreviewFormMasterItems)
    //     // end

    //     // Get the details of the users permission.
    //     // start
    //     // const library = testidsub.web.lists.getByTitle(docLibName);
    //     // const library = testidsub.web.getList(`${FolderPath}`);
    //     // const permissions = await library.getCurrentUserEffectivePermissions();
    //     // console.log("permissions",permissions);
         
    //     // Check for all permissions
    //     // const userPermissions = {
    //       // canViewPages: testidsub.web.hasPermissions(permissions, PermissionKind.ViewPages),
    //       // canView: testidsub.web.hasPermissions(permissions, PermissionKind.ViewListItems),
    //       // canEdit: testidsub.web.hasPermissions(permissions, PermissionKind.EditListItems),
    //       // canAdd: testidsub.web.hasPermissions(permissions, PermissionKind.AddListItems),          
    //       // canFullControl: testidsub.web.hasPermissions(permissions, PermissionKind.FullMask),
    //       // canDelete: testidsub.web.hasPermissions(permissions, PermissionKind.DeleteListItems),
    //       // canApprove: testidsub.web.hasPermissions(permissions, PermissionKind.ApproveItems),
    //       // canOpen: testidsub.web.hasPermissions(permissions, PermissionKind.OpenItems),
    //       // canViewVersions: testidsub.web.hasPermissions(permissions, PermissionKind.ViewVersions),
    //       // canDeleteVersions: testidsub.web.hasPermissions(permissions, PermissionKind.DeleteVersions),
    //       // canManagePermissions: testidsub.web.hasPermissions(permissions, PermissionKind.ManagePermissions),
    //       // canViewFormPages: testidsub.web.hasPermissions(permissions, PermissionKind.ViewFormPages),
    //       // canEditMyUserInfo: testidsub.web.hasPermissions(permissions, PermissionKind.EditMyUserInfo)
    //   // };
    //   // console.log("userPermissions",userPermissions);
    //   // End

    //   // Belong to admin or not start
    //   // Toggle the createFile button based on the permission
    //   const createFileButton=document.getElementById("createFileButton");
    //   const createFolder=document.getElementById("createFileButton2");
    //   // let permission:string;
    //   try {
    //     const currentUser = await sp.web.currentUser();
    //     const userGroups = await sp.web.siteUsers.getById(currentUser.Id).groups();
    //     const isMemberOfGroup = userGroups.some(group => group.Title === `${currentEntity}_Admin`);
    //     const isMemberOfSuperAdmin = userGroups.some(group => group.Title === `DMSSuper_Admin`);
    //     console.log("isMemberOfSuperAdmin",isMemberOfSuperAdmin);
    //     console.log(`Is member of ${currentEntity}_Admin:`, isMemberOfGroup);
    //     // console.log(`User is a member of the group: ${currentEntity}_Admin`);
    //     if (isMemberOfGroup || isMemberOfSuperAdmin) {
    //     console.log(`User is a member of the group: ${currentEntity}_Admin`);
    //     createFileButton.style.display="block";
    //     createFileButton2.style.display="block";
    //    }else {
    //       console.log(`User is not a member of the group: ${currentEntity}_Admin`);
    //       createFileButton.style.display="none";
    //       createFileButton2.style.display="none";
    //      }
    //   } catch (error) {
    //     console.log(`User is not a member of the group: ${currentEntity}_Admin`);
    //     createFileButton.style.display="none";
    //     createFileButton2.style.display="none";
    //   }
    //   // const currentUser = await sp.web.currentUser();
    //   // const userGroups = await sp.web.siteUsers.getById(currentUser.Id).groups();
    //   // const isMemberOfGroup = userGroups.some(group => group.Title === `${currentEntity}_Admin`);
    //   // console.log(`Is member of ${currentEntity}_Admin:`, isMemberOfGroup);
    //   // if (isMemberOfGroup) {
    //   //   // permission="Admin"
    //   //   console.log(`User is a member of the group: ${currentEntity}_Admin`);
    //   //   createFileButton.style.display="block";
    //   //   createFileButton2.style.display="block";
    //   //  } else {
    //   //   console.log(`User is not a member of the group: ${currentEntity}_Admin`);
    //   //   createFileButton.style.display="none";
    //   //   createFileButton2.style.display="none";
    //   //  }
    //   // End

    //     const DMSEntityFileMasterList=`DMS${currentEntity}FileMaster`;
    //     console.log(DMSEntityFileMasterList);
        
    //     const filesData = await sp.web.lists
    //     .getByTitle(`${DMSEntityFileMasterList}`)
    //     .items.select("FileUID","IsFavourite")
    //     .filter(
    //       `IsFavourite eq 1 and CurrentUser eq '${currentUserEmailRef.current}'`
    //     )();
     
    //     // Create a map for quick lookup of IsFavourite status by FileUID
    //     const favouriteMap = new Map(
    //       filesData.map((item: any) => [item.FileUID, item.IsFavourite])
    //     );
      

    //     // console.log("FavouriteMap",favouriteMap)
    //     console.log("Files", filesData);
     
    //     files.forEach(async(file:any) => {
    //           const isFavourite = favouriteMap.get(file.UniqueId) || 0;
    //           const favouriteText = isFavourite ? "Unmark as Favourite" : "Mark as Favourite";
         
    //           // Set display properties based on favorite status
    //           const displayPropertyforFillFavourite = isFavourite ? "block" : "none";
    //           const displayPropertyforUnFillFavourite = isFavourite ? "none" : "block";

    //           if(DMSPreviewFormMasterItems[0].IsHardDelete){
    //             // console.log("Hard Delete --->",DMSPreviewFormMasterItems[0].IsHardDelete);
    //             // if(file.ListItemAllFields.Status !== "Pending"){   
    //             //     // Function to get file icon
    //             //     const {fileIcon} = getFileIcon(file.Name);
    //             //     const card=createFileCardForDocumentLibrary(file,fileIcon,siteID,DMSPreviewFormMasterItems[0].IsHardDelete,docLibName,displayPropertyforUnFillFavourite,displayPropertyforFillFavourite,favouriteText,permission);
    //             //     container.appendChild(card);
    //             // }
    //           }else{
    //             // console.log("soft delete ---->",DMSPreviewFormMasterItems[0].IsHardDelete);
    //             if(file.ListItemAllFields.IsDeleted === null){
    //               if(file.ListItemAllFields.Status !== "Pending"){
    //                 let permission=file.ListItemAllFields.Status; 
    //                 const {fileIcon} = getFileIcon(file.Name);
    //                 const card=createFileCardForDocumentLibrary(file,fileIcon,siteID,false,docLibName,displayPropertyforUnFillFavourite,displayPropertyforFillFavourite,favouriteText,permission,FolderPath,);
    //                 container.appendChild(card);
    //               }
    //             }
    //           }
               
              
    //       // if(DMSPreviewFormMasterItems[0].IsHardDelete){
    //       //   
    //       //   if(file.ListItemAllFields.Status !== "Pending"){
          
              
    //       //     const card = document.createElement("div");
    //       //     const {fileIcon} = getFileIcon(file.Name); // Function to get file icon
    //       //     card.className = "card";
    //       //     card.dataset.fileId = file.UniqueId; // Store file ID in the card element
    //       //     card.innerHTML = `        
    //       //         <img class="filextension" src=${fileIcon} alt="File icon"/>
    //       //         <p class="p1st">${file.Name}</p>
    //       //         <p class="p3rd">${((file.Length as unknown as number) / (1024 * 1024)).toFixed(2)} MB</p>
    //       //         <div id="three-dots" class="three-dots" onclick="toggleMenu2('${file.UniqueId}', '${siteID}')">
    //       //         <span>...</span>
    //       //         </div>
    //       //       `;
         
    //       //     const menu = document.createElement("div");
    //       //     menu.id = `menu-${file.UniqueId}`;
    //       //     menu.className = "popup-menu";
    //       //     menu.innerHTML = `
    //       //       <ul>
    //       //         <li onclick="confirmDeleteFile('${file.UniqueId}', '${siteID}','${DMSPreviewFormMasterItems[0].IsHardDelete}','${null}')">
    //       //         <img src=${deleteIcon} alt="Delete"/>
    //       //                     Delete
    //       //         </li>
    //       //         <li onclick="auditHistory('${file.UniqueId}', '${siteID}','${file.Name}')">
    //       //         <img src=${editIcon} alt="Edit"/>
    //       //                     Audit History
    //       //         </li>
    //       //         <li onclick="PreviewFile('${file.ServerRelativeUrl}', '${siteID}' , '${docLibName}')">
    //       //         <img src=${editIcon} alt="Preview"/>
    //       //                     Preview File
    //       //         </li>
    //       //         <li id="favouriteToggle-${file.UniqueId}" onclick="toggleFavourite('${file.UniqueId}', '${siteID}')">
    //       //         <img src=${UnFillFavouriteFile} alt="Mark as Favourite" class="mark-as-favourite" style="display:${displayPropertyforUnFillFavourite};"/>
    //       //         <img src=${FillFavouriteFile} alt="Unmark as Favourite" class="unmark-as-favourite" style="display:${displayPropertyforFillFavourite};"/>
    //       //         <span class="favourite-text">${favouriteText}</span>
    //       //         </li>  
    //       //       </ul>
    //       //     `;
    //       //     card.appendChild(menu);
    //       //     container.appendChild(card);
    //       //   }
           

    //       // }else{
    //       //   console.log("soft delete");
    //       //   if(file.ListItemAllFields.IsDeleted === null){
    //       //     if(file.ListItemAllFields.Status !== "Pending"){
    //       //       const isFavourite = favouriteMap.get(file.UniqueId) || 0;
    //       //       const favouriteText = isFavourite ? "Unmark as Favourite" : "Mark as Favourite";
           
    //       //       // Set display properties based on favorite status
    //       //       const displayPropertyforFillFavourite = isFavourite ? "block" : "none";
    //       //       const displayPropertyforUnFillFavourite = isFavourite ? "none" : "block";
                
    //       //       const card = document.createElement("div");
    //       //       const {fileIcon} = getFileIcon(file.Name); // Function to get file icon
    //       //       card.className = "card";
    //       //       card.dataset.fileId = file.UniqueId; // Store file ID in the card element
    //       //       card.innerHTML = `        
    //       //           <img class="filextension" src=${fileIcon} alt="File icon"/>
    //       //           <p class="p1st">${file.Name}</p>
    //       //           <p class="p3rd">${((file.Length as unknown as number) / (1024 * 1024)).toFixed(2)} MB</p>
    //       //           <div id="three-dots" class="three-dots" onclick="toggleMenu2('${file.UniqueId}', '${siteID}')">
    //       //           <span>...</span>
    //       //           </div>
    //       //         `;
           
    //       //       const menu = document.createElement("div");
    //       //       menu.id = `menu-${file.UniqueId}`;
    //       //       menu.className = "popup-menu";
    //       //       menu.innerHTML = `
    //       //         <ul>
    //       //           <li onclick="confirmDeleteFile('${file.UniqueId}', '${siteID}','${false}','${null}')">
    //       //           <img src=${deleteIcon} alt="Delete"/>
    //       //                       Delete
    //       //           </li>
    //       //           <li onclick="auditHistory('${file.UniqueId}', '${siteID}','${file.Name}')">
    //       //           <img src=${editIcon} alt="Edit"/>
    //       //                       Audit History
    //       //           </li>
    //       //           <li onclick="PreviewFile('${file.ServerRelativeUrl}', '${siteID}' , '${docLibName}')">
    //       //           <img src=${editIcon} alt="Preview"/>
    //       //                       Preview File
    //       //           </li>
    //       //           <li id="favouriteToggle-${file.UniqueId}" onclick="toggleFavourite('${file.UniqueId}', '${siteID}')">
    //       //           <img src=${UnFillFavouriteFile} alt="Mark as Favourite" class="mark-as-favourite" style="display:${displayPropertyforUnFillFavourite};"/>
    //       //           <img src=${FillFavouriteFile} alt="Unmark as Favourite" class="unmark-as-favourite" style="display:${displayPropertyforFillFavourite};"/>
    //       //           <span class="favourite-text">${favouriteText}</span>
    //       //           </li>  
    //       //         </ul>
    //       //       `;
    //       //       card.appendChild(menu);
    //       //       container.appendChild(card);
    //       //     }
    //       //   }
    //       // }


    //       // if(file.ListItemAllFields.IsDeleted === null){
    //       //   if(file.ListItemAllFields.Status !== "Pending"){
    //       //     const isFavourite = favouriteMap.get(file.UniqueId) || 0;
    //       //     const favouriteText = isFavourite ? "Unmark as Favourite" : "Mark as Favourite";
         
    //       //     // Set display properties based on favorite status
    //       //     const displayPropertyforFillFavourite = isFavourite ? "block" : "none";
    //       //     const displayPropertyforUnFillFavourite = isFavourite ? "none" : "block";
              
    //       //     const card = document.createElement("div");
    //       //     const {fileIcon} = getFileIcon(file.Name); // Function to get file icon
    //       //     card.className = "card";
    //       //     card.dataset.fileId = file.UniqueId; // Store file ID in the card element
    //       //     card.innerHTML = `        
    //       //         <img class="filextension" src=${fileIcon} alt="File icon"/>
    //       //         <p class="p1st">${file.Name}</p>
    //       //         <p class="p3rd">${((file.Length as unknown as number) / (1024 * 1024)).toFixed(2)} MB</p>
    //       //         <div id="three-dots" class="three-dots" onclick="toggleMenu2('${file.UniqueId}', '${siteID}')">
    //       //         <span>...</span>
    //       //         </div>
    //       //       `;
         
    //       //     const menu = document.createElement("div");
    //       //     menu.id = `menu-${file.UniqueId}`;
    //       //     menu.className = "popup-menu";
    //       //     menu.innerHTML = `
    //       //       <ul>
    //       //         <li onclick="confirmDeleteFile('${file.UniqueId}', '${siteID}')">
    //       //         <img src=${deleteIcon} alt="Delete"/>
    //       //                     Delete
    //       //         </li>
    //       //         <li onclick="auditHistory('${file.UniqueId}', '${siteID}','${file.Name}')">
    //       //         <img src=${editIcon} alt="Edit"/>
    //       //                     Audit History
    //       //         </li>
    //       //         <li onclick="PreviewFile('${file.ServerRelativeUrl}', '${siteID}' , '${docLibName}')">
    //       //         <img src=${editIcon} alt="Preview"/>
    //       //                     Preview File
    //       //         </li>
    //       //         <li id="favouriteToggle-${file.UniqueId}" onclick="toggleFavourite('${file.UniqueId}', '${siteID}')">
    //       //         <img src=${UnFillFavouriteFile} alt="Mark as Favourite" class="mark-as-favourite" style="display:${displayPropertyforUnFillFavourite};"/>
    //       //         <img src=${FillFavouriteFile} alt="Unmark as Favourite" class="unmark-as-favourite" style="display:${displayPropertyforFillFavourite};"/>
    //       //         <span class="favourite-text">${favouriteText}</span>
    //       //         </li>  
    //       //       </ul>
    //       //     `;
    //       //     card.appendChild(menu);
    //       //     container.appendChild(card);
    //       //   }
    //       // }
          
    //     });
    //   } catch (error) {
    //     console.error("Error fetching Doclib data:", error);
    //   }
      
    // };
    window.documentLibraryPopUp = async function(fileId: string , siteID:any , FolderPath:any , FileName:any,permission:any) {
      console.log("Inside the documentLibraryPopUp");
      console.log(siteID, "siteID")
      console.log(fileId , "fileId")
      console.log(FolderPath , "folderPath")
      console.log(FileName , "fileName")
      console.log(typeof siteID, "siteID typeof")
      console.log(typeof fileId , "fileId type of")
      console.log(typeof FolderPath , "folderPath typeof")
      console.log(typeof FileName , "fileName typeof")
      // check user permission on item start
      const testidsub =await sp.site.openWebById(siteID)
      let filePermission:string;
      let filePath=`${FolderPath}/${FileName}`;
      console.log("filePath",filePath);
      const fileServerRelativePath = testidsub.web.getFileByServerRelativePath(filePath);
      // Retrieve the list item associated with the file
      const item = await fileServerRelativePath.getItem();
      console.log("items",item);
      // Get current user permissions on the item (file)
      const filePermissions = await item.getCurrentUserEffectivePermissions(); 
      console.log("File permissions:", filePermissions);
      // console.log("file listItems All field",file.ListItemAllFields);
  
      const hasFullControl = testidsub.web.hasPermissions(filePermissions, PermissionKind.ManageWeb);
      const hasEdit = testidsub.web.hasPermissions(filePermissions, PermissionKind.EditListItems);
      const hasContribute = testidsub.web.hasPermissions(filePermissions, PermissionKind.AddListItems) && testidsub.web.hasPermissions(filePermissions, PermissionKind.EditListItems);
      const hasRead = testidsub.web.hasPermissions(filePermissions, PermissionKind.ViewListItems);
      console.log(hasFullControl , "hasFullControl")
      console.log(hasEdit , "hasEdit")
      console.log(hasContribute , "hasContribute")
      console.log(hasRead , "hasRead")
  
      if (hasFullControl) {
        filePermission ="Full Control";
      } else if (hasEdit) {
        filePermission ="Edit";
      } else if (hasContribute) {
        filePermission = "Contribute";
      } else if (hasRead) {
        filePermission = "Read";
      } else {
        filePermission = "No Access";
      }
  
      console.log("filePermission",filePermission);
      let statusPermission=false;
      if(permission === "Approved"){
          statusPermission=true;
      }
      // check user permission on item End
    
    // console.log("enter here i n menu card")
    const allMenus = document.querySelectorAll('.popup-menu');
    console.log(allMenus , "allMenus")
    allMenus.forEach(menu => {
      // console.log(menu , "menu")
      // console.log(menu.id , "menu.id")
      // console.log(fileId , "fileId")
      if (menu.id !== `menu-${fileId}`) {
        menu.classList.remove("show");
      }
    });
  
    // Toggle the menu for the clicked card
    const menu = document.getElementById(`menu-${fileId}`);
    if (menu) {
      // console.log("Toggle the menu for the clicked card")
      // if(filePermission === "Edit" || filePermission === "Contribute" || filePermission === "Read" ){
      //     menu.children[0].children[0].remove();
      //     // check for read only
      //     if(filePermission === "Read"){
      //       menu.children[0].children[0].remove();
      //       menu.children[0].children[1].remove();
      //     }
      // }
      // menu.classList.toggle("show");
  
    const menu = document.getElementById(`menu-${fileId}`);
    if (!menu) return; 
    if (filePermission === "Edit" || filePermission === "Contribute" || filePermission === "Read") {
      const firstItem = menu.children[0]?.children[0] as HTMLElement;
      const secondItem = menu.children[0]?.children[1] as HTMLElement;
      const secondItem3 = menu.children[0]?.children[3] as HTMLElement;
      const secondItem4 = menu.children[0]?.children[4] as HTMLElement;
 
      if (firstItem && firstItem.style.display !== "none") {
            firstItem.style.display = "none";
      }
      if (filePermission === "Read" && secondItem && secondItem.style.display !== "none") {
            secondItem.style.display = "none";
      }
      if (filePermission === "Read" && secondItem3 && secondItem3.style.display !== "none") {
          secondItem3.style.display = "none";
      }
      if (filePermission === "Read" && secondItem4 && secondItem4.style.display !== "none") {
        secondItem4.style.display = "none";
     }
    }
    
    if(statusPermission === true){
      const firstItem = menu.children[0]?.children[0] as HTMLElement;
      if (firstItem && firstItem.style.display !== "none") {
          firstItem.style.display = "none";
      }
    }
   
  
    menu.classList.toggle("show");
    }
  
    
    document.addEventListener('click', (event) => {
    
      // console.log("Outside click Event Called");
    
      const target = event.target as HTMLElement;
    
      // Check if the click was inside any menu or three-dot icon
      const isClickInsideMenu = target.closest('.popup-menu');
      const isClickInsideThreeDots = target.closest('.three-dots');
    
      // console.log("This is nested folder",isClickInsideThreeDots);
    
      if (!isClickInsideMenu && !isClickInsideThreeDots) {
        const allMenus = document.querySelectorAll('.popup-menu');
        allMenus.forEach(menu => {
          menu.classList.remove('show');
        });
      }
    });
  }
  const createFileCardForDocumentLibrary=(file:any,fileIcon:any,siteID:string,IsHardDelete:boolean,docLibName:string,displayPropertyforUnFillFavourite:any,displayPropertyforFillFavourite:any,favouriteText:any,permission:any,FolderPath:any)=>{
    // console.log("permission",permission);
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.fileId = file.UniqueId;
    card.innerHTML = `        
            <img class="filextension" src=${fileIcon} alt="File icon"/>
            <p class="p1st">${file.Name}</p>
            <p class="p3rd">${((file.Length as unknown as number) / (1024 * 1024)).toFixed(2)} MB</p>
            <div id="three-dots" class="three-dots" onclick="documentLibraryPopUp('${file.UniqueId}', '${siteID}','${FolderPath}','${file.Name}','${permission}')">
            <span>...</span>
            </div>
          `;
   
        const menu = document.createElement("div");
        menu.id = `menu-${file.UniqueId}`;
        menu.className = "popup-menu";
        // Conditionally add the delete option based on permission
        // let deleteOptionHTML = "";
        // if (permission === "Admin") {
        //     deleteOptionHTML = `
        //         <li onclick="confirmDeleteFile('${file.UniqueId}', '${siteID}', '${IsHardDelete}', '${null}')">
        //             <img src=${deleteIcon} alt="Delete"/>
        //             Delete
        //         </li>
        //     `;
        // }
        menu.innerHTML = `
          <ul>
            <li onclick="confirmDeleteFile('${file.UniqueId}', '${siteID}', '${IsHardDelete}', '${null}')">
                    <img src=${deleteIcon} alt="Delete"/>
                    Delete
            </li>
            <li onclick="auditHistory('${file.UniqueId}', '${siteID}','${currentDocumentLibrary}','${currentEntity}')">
            <img src=${editIcon} alt="Edit"/>
                        Audit History
            </li>
            <li onclick="PreviewFile('${file.ServerRelativeUrl}', '${siteID}' , '${docLibName}')">
            <img src=${editIcon} alt="Preview"/>
                        Preview File
            </li>
            <li id="favouriteToggle-${file.UniqueId}" onclick="toggleFavourite('${file.UniqueId}', '${siteID}')">
            <img src=${UnFillFavouriteFile} alt="Mark as Favourite" class="mark-as-favourite" style="display:${displayPropertyforUnFillFavourite};"/>
            <img src=${FillFavouriteFile} alt="Unmark as Favourite" class="unmark-as-favourite" style="display:${displayPropertyforFillFavourite};"/>
            <span class="favourite-text">${favouriteText}</span>
            </li>
            <li onclick="shareFile('${file.UniqueId}','${siteID}','${FolderPath}','${file.Name}','DocumentLibrary','${file.MajorVersion}','${((file.Length as unknown as number) / (1024 * 1024)).toFixed(2)}','${file.ListItemAllFields.Status}','','${currentDocumentLibrary}')">
            <img src=${ShareFile} alt="Share"/> Share
            </li>  
          </ul>
        `;
        card.appendChild(menu);
        return card;
}
    // Helper function to determine the file icon based on file extension
    // const getFileIcon = (fileName: string) => {
    //   console.log(fileName , "filenmae")
    //   const fileExtension = fileName.split(".").pop().toLowerCase();
    //   switch (fileExtension) {
    //     case "doc":
    //     case "docx":
    //       return require("../assets/DOC.png");
    //     case "txt":
    //       return require("../assets/TXT.png");
    //     case "pdf":
    //       return require("../assets/PDF.png");
    //     case "xls":
    //     case "xlsx":
    //       return require("../assets/XLS.png");
    //     case "zip":
    //       return require("../assets/ZIP.png");
    //     default:
    //       return require("../assets/DOC.png");
    //   }
    // };
  
   // This function give the File Icon
   const getFileIcon = (fileName:any) => {
         
     
    const fileExtension = fileName.split(".").pop().toLowerCase();
    let fileIcon;
    switch (fileExtension) {
      case "doc":
      case "docx":
        fileIcon = require("../assets/DOC.png");
        break;
      case "txt":
        fileIcon = require("../assets/TXT.png");
        break;
      case "pdf":
        fileIcon = require("../assets/PDF.png");
        break;
      case "xls":
      case "xlsx":
        fileIcon = require("../assets/XLS.png");
        break;
      case "zip":
        fileIcon = require("../assets/ZIP.png");
        break;
      default:
        fileIcon = require("../assets/DOC.png"); // Default icon if no match
        break;
    }
    return {fileIcon,fileExtension};
  };
  // window.PreviewFile = function(path :any , SiteID:any , docLibName:any , filemasterlist:any , filepreview:any){
    
  //   if(filepreview !== undefined || null ){
  //     alert(filepreview)
  //     const createpreviewdiv = document.createElement('div')
  //   createpreviewdiv.style.display = 'grid'
  //   const previewfileframe = document.createElement('iframe') 
  //   previewfileframe.id = 'filePreview'
  //   previewfileframe.style.width = '930px'
  //   previewfileframe.style.height = '500px'
  //   const librarydiv= document.getElementById('files-container')
  //   const createbutton = document.createElement('button')
  //   createbutton.textContent = 'Back To DMS';
  //  console.log("enter here in preview : ",path)
  //  const encodedFilePath = encodeURIComponent(path);
  // console.log(encodedFilePath, "encodedFilePath");
  
  // // Extract the parent folder correctly
  // const parentFolder = path.substring(0, path.lastIndexOf('/'));
  // console.log(parentFolder, "parentFolder");
  
  // // Correctly encode the parent folder
  // const encodedParentFolder = encodeURIComponent(parentFolder);
  
  // // Get the base site URL
  // const siteUrl = window.location.origin;
  // console.log(siteUrl, "siteUrl");
  
  // console.log(path , ".....path")
  // // Generate the correct preview URL
  // // const previewUrl = `${siteUrl}/sites/AlRostmani/${currentEntity}/${myactualdoclib}/Forms/AllItems.aspx?id=${path}&parent=${encodedParentFolder}`;
  
  // // console.log(previewUrl, "Generated preview URL");
   
  //   // console.log("Generated Preview URL:", previewUrl);
    
  //     librarydiv.innerHTML = "";
  //     previewfileframe.src = filepreview;
  //     createpreviewdiv.appendChild(createbutton)
  //     createpreviewdiv.appendChild(previewfileframe);
  //     librarydiv.appendChild(createpreviewdiv)
  //     createbutton.addEventListener('click', function() {
  //       event.preventDefault()
  //       event.stopPropagation()
  //       alert('Button was clicked!');
  //       myRequest()
  //   });
    
  //   }
  //   if(filepreview == undefined || null ){
  //     console.log(path , "path filepreview")
  //     console.log(SiteID , "SiteID filepreview")
  //     console.log(docLibName , "docLibName filepreview")
  //     console.log(filemasterlist , "filemasterlist filepreview")
  //     console.log(filepreview , "filepreview filepreview")
  //     const segments = path.split('/');
    
  //     // Find the index of 'sites'
  //     const sitesIndex = segments.indexOf('sites');
    
  //     // If 'sites' is found and there are enough segments after it
  //     let myactualdoclib
  //     if (sitesIndex !== -1 && segments.length > sitesIndex + 3) {
  //       myactualdoclib = segments[sitesIndex + 3];
  //       console.log(myactualdoclib , "myactualdoclib")
  //       // return segments[sitesIndex + 3];  // The document library is the 4th segment after 'sites'
  //     } else {
  //       // return null;  // Return null if not enough segments are available
  //     }
  //     event.preventDefault()
  //     event.stopPropagation()
  //     const createpreviewdiv = document.createElement('div')
  //     createpreviewdiv.style.display = 'grid'
  //     const previewfileframe = document.createElement('iframe') 
  //     previewfileframe.id = 'filePreview'
  //     previewfileframe.style.width = '930px'
  //     previewfileframe.style.height = '500px'
  //     const librarydiv= document.getElementById('files-container')
  //     const createbutton = document.createElement('button')
  //     createbutton.textContent = 'Back To DMS';
  //    console.log("enter here in preview : ",path)
  //    const encodedFilePath = encodeURIComponent(path);
  //   console.log(encodedFilePath, "encodedFilePath");
    
  //   // Extract the parent folder correctly
  //   const parentFolder = path.substring(0, path.lastIndexOf('/'));
  //   console.log(parentFolder, "parentFolder");
    
  //   // Correctly encode the parent folder
  //   const encodedParentFolder = encodeURIComponent(parentFolder);
    
  //   // Get the base site URL
  //   const siteUrl = window.location.origin;
  //   console.log(siteUrl, "siteUrl");
    
  //   console.log(path , ".....path")
  //   // Generate the correct preview URL
  //   const previewUrl = `${siteUrl}/sites/AlRostmani/${currentEntity}/${myactualdoclib}/Forms/AllItems.aspx?id=${path}&parent=${encodedParentFolder}`;
    
  //   console.log(previewUrl, "Generated preview URL");
     
  //     console.log("Generated Preview URL:", previewUrl);
  //     if(previewUrl){
  //       librarydiv.innerHTML = "";
  //       previewfileframe.src = previewUrl;
  //       createpreviewdiv.appendChild(createbutton)
  //       createpreviewdiv.appendChild(previewfileframe);
  //       librarydiv.appendChild(createpreviewdiv)
  //       createbutton.addEventListener('click', function() {
  //         event.preventDefault()
  //         event.stopPropagation()
  //         alert('Button was clicked!');
  //         getdoclibdata(currentfolderpath , currentsiteID , currentDocumentLibrary)
  //     });
  //     }
  //   }
   
  // }
  // For getting the folder data 
  // const getfolderdata = async (FolderPath:any, siteID:any) => {
  //   console.log("enter here");
  //   // event.preventDefault();
  //   // event.stopPropagation();
  //   currentsiteID=siteID;
  //   currentfolderpath=FolderPath;
  //   //created subsite context
  //   const testidsub = await sp.site.openWebById(siteID)
  //   console.log("Inside Folder directory",testidsub);
  //   const container = document.getElementById("files-container");
  //   container.innerHTML = "";
  //   try {
  
  //     //   const actualpath = `/sites/AlRostmani${FolderPath}`;
  //     //   const folder = await sp.web.getFolderByServerRelativePath(actualpath).files();
  //       const folder = await testidsub.web.getFolderByServerRelativePath(FolderPath).files();
  //       console.log(folder, "folder", typeof(folder), "type of folder");
  //       myfolderdata = folder;
        
  //       console.log(myfolderdata, "myfolderdata");
  
  //       for (const file of folder) {
  //           const fileItem = await testidsub.web.getFileByServerRelativePath(file.ServerRelativeUrl)();
  //           const name = file.Name;
  //           const filesize:any = fileItem.Length;
  //           const Actualfilesize = (filesize / (1024 * 1024)).toFixed(2);
  //           const fileid= file.UniqueId
  //           console.log(name, Actualfilesize, "name and file size");
  
  //           const card = document.createElement("div");
  //           card.className = "card";
  
  //           const Docicon = require("../assets/DOC.png");
  //           const Txticon = require("../assets/TXT.png");
  //           const Pdficon = require("../assets/PDF.png");
  //           const Xlsicon = require("../assets/XLS.png");
  //           const Zipicon = require("../assets/ZIP.png");
  //           let fileIcon;
  //           const fileExtension = name.split(".").pop().toLowerCase(); // Get the file extension
  
  //           switch (fileExtension) {
  //               case "doc":
  //               case "docx":
  //                   fileIcon = Docicon;
  //                   break;
  //               case "txt":
  //                   fileIcon = Txticon;
  //                   break;
  //               case "pdf":
  //                   fileIcon = Pdficon;
  //                   break;
  //               case "xls":
  //               case "xlsx":
  //                   fileIcon = Xlsicon;
  //                   break;
  //               case "zip":
  //                   fileIcon = Zipicon;
  //                   break;
  //               default:
  //                   fileIcon = Docicon; // Default icon if no match
  //                   break;
  //           }
  
  //           card.innerHTML = `
  //               <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
  //               <p class="p1st">${name}</p>
  //               <p class="p2nd"></p>
  //               <p class="p3rd">${Actualfilesize} MB</p>
  //               <div class="three-dots" onclick="toggleMenu2('${fileid}', '${siteID}')">
  //                   <span>...</span>
  //               </div>
  //           `;
  //           const menu = document.createElement("div");
  //           menu.id = `${`menu-${fileid}`}`;
  //           menu.className = "popup-menu";
  //           menu.innerHTML = `
  //             <ul>
  //                 <li onclick="deleteFile('${fileid}','${siteID}')">
  //                 <img src=${deleteIcon} alt="Delete"/>
  //                 Delete
  //               </li>
  //               <li onclick="editFile('${fileid}',  '${siteID}')">
  //                 <img src=${editIcon} alt="AuditHistory"/>
  //                 Audit History
  //               </li>  
  //             </ul>
  //           `;
          
  //           card.appendChild(menu);
  //           container.appendChild(card);
  //       }
  //   } catch (error) {
  //       console.error("Error fetching data:", error);
  //   }
  // };
  
  // Search File Function
  //    const searchFiles = async (event: React.FormEvent) => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     console.log("Inside the searchFiles");
  //     const searchInput = document.getElementById('searchinput') as HTMLInputElement;
  
  //     console.log(searchInput.value, "searchInput.value");
  //     if (searchInput.value !== "" && searchInput.value !== null) {
  //         console.log(myfolderdata, "my data");
  //         let filteredFiles = myfolderdata.filter((file: any) => file.Name.toLowerCase().includes(searchInput.value.toLowerCase()));
  //         console.log(filteredFiles, "filteredFiles");
  //         const container = document.getElementById("files-container");
  //         container.innerHTML = ""; // Clear previous search results
  
  //         // Process the filtered files
  //         if (filteredFiles.length > 0) {
  //             console.log(filteredFiles, "filteredFiles");
  //             for (const file of filteredFiles) {
  //                 console.log(file.Name, "file.Name");
  //                 console.log(file.Length, "file.Length");
  //                 const Actualfilesize = (file.Length / (1024 * 1024)).toFixed(2);
  //                 const card = document.createElement("div");
  //                 const Docicon = require("../assets/DOC.png");
  //                 const Txticon = require("../assets/TXT.png");
  //                 const Pdficon = require("../assets/PDF.png");
  //                 const Xlsicon = require("../assets/XLS.png");
  //                 const Zipicon = require("../assets/ZIP.png");
  //                 let fileIcon;
  //                 const fileExtension = file.Name.split(".").pop().toLowerCase(); // Get the file extension
          
  //                 switch (fileExtension) {
  //                   case "doc":
  //                     fileIcon = Docicon;
  //                     break;
  //                   case "docx":
  //                     fileIcon = Docicon;
  //                     break;
  //                   case "txt":
  //                     fileIcon = Txticon;
  //                     break;
  //                   case "pdf":
  //                     fileIcon = Pdficon;
  //                     break;
  //                   case "xls":
  //                   case "xlsx":
  //                     fileIcon = Xlsicon;
  //                     break;
  //                   case "zip":
  //                     fileIcon = Zipicon;
  //                     break;
  //                   default:
  //                     fileIcon = Docicon; // Default icon if no match
  //                     break;
  //                 }
          
  //                 card.className = "card";
  //                 card.innerHTML = `         
  //                     <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
  //                     <p class="p1st">${file.Name}</p>
  //                     <p class="p2nd"></p>
  //                     <p class="p3rd">${Actualfilesize} MB</p>
  //                     <div class="three-dots" onclick="toggleMenu2('${file.UniqueId}','${currentsiteID}')">
  //                         <span>...</span>
  //                     </div>
                       
  //                 `;
  //       const menu = document.createElement("div");
  //         menu.id = `${`menu-${file.UniqueId}`}`;
  //         menu.className = "popup-menu";
  //         menu.innerHTML = `
  //           <ul>
  //           <li onclick="deleteFile('${file.UniqueId}','${currentsiteID}')">
  //               <img src=${deleteIcon} alt="Delete"/>
  //               Delete
  //             </li>
  //             <li onclick="editFile('${file.UniqueId}','${currentsiteID}')">
  //               <img src=${editIcon} alt="AuditHistory"/>
  //               Audit History
  //             </li>  
  //           </ul>
  //         `;
        
  //         card.appendChild(menu);
                  
  //                 container.appendChild(card);
  //             }
  //         } else {
  //             console.log("No file found with the name:", searchInput.value);
  //         }
  //     } else {
  //         console.log("outttt");
  //     }
  // };
//   const searchFiles = async (event: React.FormEvent ) => {
//     event.preventDefault();
//     event.stopPropagation();
  
//     const searchInput = document.getElementById('searchinput') as HTMLInputElement;
//     const searchText = searchInput.value;
//     console.log(searchText , "searchText")
//   //  console.log(currentsiteID , "currentsiteID")
//     // const webInfo = await sp.site.openWebById(currentsiteID);
//     // console.log(webInfo , "webinfo")
//     // console.log("WebId: ", (webInfo as any).Id);
//     // const folder = await sp.web.getFolderByServerRelativePath(currentfolderpath)();
//     fetch("/sites/AlRostmani/AARG/_api/web", {
//       method: "GET",
//       headers: {
//         "Accept": "application/json;odata=verbose"
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         const webId = data.d.Id;
//         console.log("WebId: ", webId);
//       })
//     // Get the folder ID and other relevant properties
//     // const folderDetails = {
//     //     name: folder.Name,
//     //     uniqueId: folder.UniqueId,  // Unique ID of the folder
//     //     itemCount: folder.ItemCount,
//     //     serverRelativeUrl: folder.ServerRelativeUrl
//     // };
//     // const FolderUID :any = folderDetails.uniqueId
//     // console.log(folderDetails.uniqueId , "folderDetails.uniqueId ")
//     // console.log(`https://officeindia.sharepoint.com/${currentfolderpath}` , "path")
//     const site = await sp.site.getContextInfo()
//     console.log(site , "site")
//     const site2 = await sp.site.getRootWeb()
//     console.log(site2 , "site2")
//     const currentsiteID2 = "338f2337-8cbb-4cd1-bed1-593e9336cd0e"; // siteId of the site collection
// const currentWebId = "c77461a3-065c-47b7-92f2-21fbcf443806"; // webId of the subsite
// const FolderUID = "5358a5c7-69de-4876-9fb9-10de04322671"; // ListId of the document library
// const currentfolderpath = "/sites/AlRostmani/AARG/IOCSignedDocument"; // server-relative path of the folder

//     if (searchText !== "" ) {
//         try {
//           console.log(currentfolderpath, "currentfolderpath")
//             const searchQuery = {
//                   // Querytext: `"${searchText}"`, 
                
//                   Querytext:`${searchText} AND (siteId:${currentsiteID2}) AND (webId:${currentsiteID}) AND (ListId:${FolderUID}) AND (path:"https://officeindia.sharepoint.com/${currentfolderpath}" OR ParentLink:"https://officeindia.sharepoint.com/${currentfolderpath}*")`, 
//                 // Querytext:`"${searchText}" AND ParentLink:"https://officeindia.sharepoint.com${currentfolderpath}"`,
//                 RowLimit: 500,
//                 SelectProperties: ["Title", "Path", "FileExtension", "UniqueId", "Size", "Created", "Modified"],  // Additional file properties
//                 // Refiners: 'FileExtension',
//                 // RefinementFilters: ['FileExtension:equals("docx")', 
//                 //                     'FileExtension:equals("pdf")', 
//                 //                     'FileExtension:equals("pptx")',
//                 //                   ],  
//                 // TrimDuplicates: false
//             };
//             // Performing the search
//             const searchResults = await sp.search(searchQuery);
//             const files = searchResults.PrimarySearchResults;
            
            
//             // console.log("routeToDiffSideBar",routeToDiffSideBar);
  
//             console.log(files, "files");
//             // Clear the previous results
//             const container = document.getElementById("files-container");
//             container.innerHTML = "";
  
//             // Display the search results
//             // start
//           if( routeToDiffSideBar === "" ){
//                 files.forEach((file: any) => {
//                     const card = document.createElement("div");
//                     const {fileIcon} = getFileIcon(file.Title);  
//                     card.className = "card";
//                     card.dataset.fileId = file.UniqueId; 
//                     // console.log(file.UniqueId , "file.UniqueId")
//                     card.innerHTML = `
//                           <div class="IMGContainer">
                    
//                         <img class="filextension" src=${fileIcon} alt="File icon"/>
//                                  </div>   
//                                    <div class="CardTextContainer">
//                         <p class="p1st">${file.Title}</p>
//                         <p class="p3rd">${((file.Size as unknown as number) / (1024 * 1024)).toFixed(2)} MB</p>
//                         <div id="three-dots" class="three-dots" onclick="toggleMenu2('${file.UniqueId}', '${currentsiteID}')">
//                           <span>...</span>
//                         </div>
//                            </div>
//                     `;
//                     const menu = document.createElement("div");
//                     menu.id = `menu-${file.UniqueId}`;
//                     menu.className = "popup-menu";
//                     menu.innerHTML = `
//                       <ul>
//                         <li onclick="confirmDeleteFile('${file.UniqueId}', '${currentsiteID}')">
//                           <img src=${deleteIcon} alt="Delete"/>
//                           Delete
//                         </li>
//                         <li onclick="editFile('${file.UniqueId}', '${currentsiteID}')">
//                           <img src=${editIcon} alt="Edit"/>
//                           Audit History
//                         </li>
//                         <li onclick="PreviewFile('${file.ServerRelativeUrl}', '${currentsiteID}' , '${currentDocumentLibrary}')">
//                           <img src=${editIcon} alt="Preview"/>
//                           Preview File
//                         </li>
//                         <li id="favouriteToggle-${file.UniqueId}" onclick="toggleFavourite('${file.UniqueId}', '${currentsiteID}')">
//                           <img src=${UnFillFavouriteFile} alt="Mark as Favourite" class="mark-as-favourite"/>
//                           <img src=${FillFavouriteFile} alt="Unmark as Favourite" class="unmark-as-favourite" style="display:none;"/>
//                           <span class="favourite-text">Mark as Favourite</span>
//                         </li>  
//                       </ul>
//                     `;
              
//                     card.appendChild(menu);
//                     container.appendChild(card);
//                 });
//           }else{
//               if( routeToDiffSideBar === "myRequest" ){
//                   myRequest(null,null,searchInput);
//               }
              
//               if( routeToDiffSideBar === "myFavourite" ){
  
//                     // console.log("myFavourite");
//                     myFavorite(null,null,searchInput);
                    
//               }
//               if( routeToDiffSideBar === "myFolder"){
//                     // console.log("Inside search => myFolder");
//                     mycreatedfolders(event,searchInput);
//               }
//           }
//           // end
//         } catch (error) {
//             console.error("Error searching files: ", error);
//         }
//     }
  
  
//   };
window.PreviewFile = function(path :any , SiteID:any , docLibName:any,flag:string){
  console.log(docLibName , "docLibName")
  console.log("path",path);
  const segments = path.split('/');
  // extarct the current entity start
    const currentSubsite = segments[3]; 
  // end
  // Find the index of 'sites'
  const sitesIndex = segments.indexOf('sites');

  // If 'sites' is found and there are enough segments after it
  let myactualdoclib
  if (sitesIndex !== -1 && segments.length > sitesIndex + 3) {
    myactualdoclib = segments[sitesIndex + 3];
    console.log(myactualdoclib , "myactualdoclib")
    // return segments[sitesIndex + 3];  // The document library is the 4th segment after 'sites'
  } else {
    // return null;  // Return null if not enough segments are available
  }
  event.preventDefault()
  event.stopPropagation()
  const createpreviewdiv = document.createElement('div')
  createpreviewdiv.style.display = 'grid'
  const previewfileframe = document.createElement('iframe') 
  previewfileframe.id = 'filePreview'
  previewfileframe.style.width = '930px'
  previewfileframe.style.height = '500px'
  const librarydiv= document.getElementById('files-container')
  const createbutton = document.createElement('button')
  createbutton.textContent = 'Back To DMS';
 console.log("enter here in preview : ",path)
 const encodedFilePath = encodeURIComponent(path);
console.log(encodedFilePath, "encodedFilePath");

// Extract the parent folder correctly
const parentFolder = path.substring(0, path.lastIndexOf('/'));
console.log(parentFolder, "parentFolder");

// Correctly encode the parent folder
const encodedParentFolder = encodeURIComponent(parentFolder);

// Get the base site URL
const siteUrl = window.location.origin;
console.log(siteUrl, "siteUrl");

console.log(path , ".....path")
// Generate the correct preview URL
// const previewUrl = `${siteUrl}/sites/AlRostmani/${currentEntity}/${myactualdoclib}/Forms/AllItems.aspx?id=${path}&parent=${encodedParentFolder}`;
const previewUrl = `${siteUrl}/sites/AlRostmani/${currentSubsite}/${myactualdoclib}/Forms/AllItems.aspx?id=${path}&parent=${encodedParentFolder}`;
// const previewUrl = `${siteUrl}/sites/SPFXDemo/${currentEntity}/${myactualdoclib}/Forms/AllItems.aspx?id=${path}&parent=${encodedParentFolder}`;

console.log(previewUrl, "Generated preview URL");
 
  console.log("Generated Preview URL:", previewUrl);
  if(previewUrl){
    librarydiv.innerHTML = "";
    previewfileframe.src = previewUrl;
    createpreviewdiv.appendChild(createbutton)
    createpreviewdiv.appendChild(previewfileframe);
    librarydiv.appendChild(createpreviewdiv)
    createbutton.addEventListener('click', function() {
      event.preventDefault()
      event.stopPropagation()
      alert('Button was clicked!');
      if(flag === "shareWithMe"){
          ShareWithMe(null,null);
      }
      if(flag === "documentLibrary"){
        getdoclibdata(currentfolderpath , currentsiteID , currentDocumentLibrary)
      }
      
  });
  }
}
const searchFiles = async (event: React.FormEvent ) => {
  event.preventDefault();
  event.stopPropagation();

  const searchInput = document.getElementById('searchinput') as HTMLInputElement;
  const searchText = searchInput.value;
  console.log(searchText , "searchText")
 
 
  // if(currentFolder === ""){
  //   console.log("currentFolder --->",currentFolder);
  //   console.log("currentDocumentLibrary --->",currentDocumentLibrary)
  // }else{
  //   console.log("Inside else");
  //   console.log("currentFolder --->",currentFolder);
  //   console.log("currentDocumentLibrary --->",currentDocumentLibrary)
  // }
  // const testidsub = await sp.site.openWebById(currentsiteID);
  // const library = await testidsub.web.lists.getByTitle(currentDocumentLibrary).select("Id")();
  // console.log("Library",library);
  // console.log(`Document Library ID: ${library.Id}`);

  // const folder = await testidsub.web.getFolderByServerRelativePath(`${currentfolderpath}`).select("UniqueId")();
  // console.log(`Folder ID: ${folder.UniqueId}`);
  // console.log("Folder",folder);


  if (searchText !== "" ) {
      try {
        console.log(currentfolderpath, "currentfolderpath")
          const searchQuery = {
               Querytext:`"${searchText}" AND ParentLink:"https://officeindia.sharepoint.com${currentfolderpath}"`,
              // Querytext: `"${searchText}"`,
              RowLimit: 500,
              SelectProperties: ["Title", "Path", "FileExtension", "UniqueId", "Size", "Created", "Modified"],  // Additional file properties
              // Refiners: 'FileExtension',
              // RefinementFilters: ['FileExtension:equals("docx")',
              //                     'FileExtension:equals("pdf")',
              //                     'FileExtension:equals("pptx")',
              //                   ],  
              // TrimDuplicates: false
          };
          // Performing the search
          const searchResults = await sp.search(searchQuery);
          const files = searchResults.PrimarySearchResults;
         
         
          // console.log("routeToDiffSideBar",routeToDiffSideBar);

          console.log(files, "files");
          // Clear the previous results
          const container = document.getElementById("files-container");
          container.innerHTML = "";

          // Display the search results
          // start
        if( routeToDiffSideBar === "" ){
              files.forEach((file: any) => {
                  const card = document.createElement("div");
                  const {fileIcon} = getFileIcon(file.Title);  
                  card.className = "card";
                  card.dataset.fileId = file.UniqueId;
                  // console.log(file.UniqueId , "file.UniqueId")
                  card.innerHTML = `
                      <img class="filextension" src=${fileIcon} alt="File icon"/>
                      <p class="p1st">${file.Title}</p>
                      <p class="p3rd">${((file.Size as unknown as number) / (1024 * 1024)).toFixed(2)} MB</p>
                      <div id="three-dots" class="three-dots" onclick="toggleMenu2('${file.UniqueId}', '${currentsiteID}')">
                        <span>...</span>
                      </div>
                  `;
                  const menu = document.createElement("div");
                  menu.id = `menu-${file.UniqueId}`;
                  menu.className = "popup-menu";
                  menu.innerHTML = `
                    <ul>
                      <li onclick="confirmDeleteFile('${file.UniqueId}', '${currentsiteID}')">
                        <img src=${deleteIcon} alt="Delete"/>
                        Delete
                      </li>
                      <li onclick="auditHistory('${file.UniqueId}', '${currentsiteID}','${file.Title}')">
                        <img src=${editIcon} alt="Edit"/>
                        Audit History
                      </li>
                      <li onclick="PreviewFile('${file.ServerRelativeUrl}', '${currentsiteID}' , '${currentDocumentLibrary}')">
                        <img src=${editIcon} alt="Preview"/>
                        Preview File
                      </li>
                      <li id="favouriteToggle-${file.UniqueId}" onclick="toggleFavourite('${file.UniqueId}', '${currentsiteID}')">
                        <img src=${UnFillFavouriteFile} alt="Mark as Favourite" class="mark-as-favourite"/>
                        <img src=${FillFavouriteFile} alt="Unmark as Favourite" class="unmark-as-favourite" style="display:none;"/>
                        <span class="favourite-text">Mark as Favourite</span>
                      </li>  
                    </ul>
                  `;
           
                  card.appendChild(menu);
                  container.appendChild(card);
              });
        }else{
            if( routeToDiffSideBar === "myRequest" ){
                myRequest(null,null,searchInput);
            }
           
            else if( routeToDiffSideBar === "myFavourite" ){

                  // console.log("myFavourite");
                  myFavorite(null,null,searchInput);
                 
            }
            else if( routeToDiffSideBar === "myFolder"){
                  // console.log("Inside search => myFolder");
                  mycreatedfolders(event,searchInput);
            }
            else if(routeToDiffSideBar === "shareWithOthers"){
                ShareWithOther(null,searchInput);
            }
            else if(routeToDiffSideBar === "shareWithMe"){
                ShareWithMe(null,searchInput);
            }
        }
        // end
      } catch (error) {
          console.error("Error searching files: ", error);
      }
  }


};

// Share With ME & Share With Others ///
// const ShareWithOther=async(event:React.MouseEvent<HTMLButtonElement>=null,searchText:HTMLInputElement=null)=>{
//   const wait = document.getElementById('files-container')
//   wait.classList.remove('hidemydatacards')
//   const hidegidvewlistviewbutton = document.getElementById('hidegidvewlistviewbutton')
//   if (hidegidvewlistviewbutton) {
//    console.log("enter here .....................")
//    hidegidvewlistviewbutton.style.display = 'none'
  
//  }
//   if(createFileButton2){
//     createFileButton2.style.display = 'none'
//     }
//     if(createFileButton){
//     createFileButton.style.display = 'none'
//     }
//   if(event){
//     event.preventDefault();
//     event.stopPropagation();
//   }
//   console.log("Share with others called");
//   console.log("searchInput",searchText);

//   const container = document.getElementById("files-container");
//   container.innerHTML="";

//   const FilesItems = await sp.web.lists
//   .getByTitle("MasterSiteURL")
//   .items.select("Title", "SiteID", "FileMasterList", "Active")
//   .filter(`Active eq 'Yes'`)();

//   // console.log("Files items", FilesItems);
//   FilesItems.forEach(async(fileItem)=>{
//     if(fileItem.FileMasterList !== null){
//       // console.log(files.FileMasterList);

//       const filesData = await sp.web.lists
//       .getByTitle(`${fileItem.FileMasterList}`)
//       .items.select("FileName", "FileUID", "FileSize", "FileVersion","ShareWithOthers")
//       .filter(
//         `CurrentUser eq '${currentUserEmailRef.current}'`
//       )();

     
//       console.log("Files Data ",filesData);
//       routeToDiffSideBar="shareWithOthers"
//       let filteredFileData=[];
//       if(searchText !== null){
//             filteredFileData=filesData.filter((file: any) => file?.FileName?.toLowerCase().includes(searchText?.value?.toLowerCase()))
//       }else{
//         filteredFileData=filesData;
//       }
//       filteredFileData.forEach((file) => {

//         if( file.ShareWithOthers !== null ){
         
//           const sharedUserInTheFormOFstring = file.ShareWithOthers;
        
//           let sharedUsers = JSON.parse(sharedUserInTheFormOFstring);
//           console.log(sharedUsers , " here is shared users")
//           if(sharedUsers.length === 0){
//               return;
//           }
         
//           // Get the first two users
//           const firstTwoUsers = sharedUsers.slice(0, 2);

//           // Remaining users count
//           const moreUsersCount = sharedUsers.length - 2;

//           // Create shared users HTML for the first two users
//           let sharedUsersHTML = firstTwoUsers
//               .map((user:any) => {
//                   let firstNameInitial;
//                   console.log(user , "sharewith me users")
//                   console.log("user firstnamw", user.SharedWith)
//                   console.log("user lastnamw",user.LastName)
//                   let lastNameInitial=""
//                   if(user.FirstName !== null){
//                         firstNameInitial = user.FirstName.charAt(0).toUpperCase();
//                   }
//                   if(user.LastName !== null){
//                         lastNameInitial=user.LastName.charAt(0).toUpperCase();
//                   }

//                   return `<span  flow="down" tooltip='${user.FirstName }' class="shared-user">${firstNameInitial}${lastNameInitial}</span>`;
//                   })
//                   .join("");

//                let array = ["test1" , "test2" , "test3" , "test4"]
//                console.log(array , "array")
//           // If there are more users, add "+more"
//           if (moreUsersCount > 0) {
//                 sharedUsersHTML += `<span class="more-users" flow="down" tooltip='${array }'>+${moreUsersCount} more</span>`;
//           }
         
//           const {fileIcon, fileExtension}= getFileIcon(file.FileName);
//           // const card = createFileCard(file, fileIcon, fileItem.SiteID,fileItem.FileMasterList,fileExtension);
//           const card = document.createElement("div");
//           card.className = "card";
//           card.dataset.fileId = file.FileUID; // Store file ID in the card element
//           card.dataset.listId = fileItem.SiteID; // Store site ID
       
//           card.innerHTML = `        
//             <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
//             <p class="p1st">${file.FileName}</p>
//             <div class="fileSizeAndVersion">
//               <p class="p3rd">${file.FileSize} MB</p>
//               <p class="p2nd">${file.FileVersion}</p>
//             </div>
//              <div class="sharedFile">
//               ${sharedUsersHTML}
//             </div>
//           `;
//           container.appendChild(card);

//         }
//       });
     
//     }        
//   })

// }
const ShareWithOther=async(event:React.MouseEvent<HTMLButtonElement>=null,searchText:HTMLInputElement=null)=>{
  if(event){
    event.preventDefault();
    event.stopPropagation();
  }
     // clean the url start
     const newUrl = `${window.location.origin}${window.location.pathname}`;
     window.history.pushState(null, '', newUrl)
     // New code to hide the create file and folder button start
     if(createFileButton2){
       createFileButton2.style.display = 'none'
       }
       if(createFileButton){
       createFileButton.style.display = 'none'
       }
     //End 
     // end
     // New Code start
     const DMSShareWithOtherMaster= await sp.web.lists
     .getByTitle("DMSShareWithOtherMaster")
     .items.select("FileName", "FileUID", "FileVersion", "FileSize","CurrentUser","DocumentLibraryName","CurrentFolderPath","ShareWithOthers","Status","SiteID","SiteName","FilePreviewURL","ShareAt","UserID","PermissionType")
     .filter(`CurrentUser eq '${currentUserEmailRef.current}'`).orderBy("Created", false)();

     // Mapped the file with the users
  // Mapped the file with the users
  const groupedData =DMSShareWithOtherMaster.reduce((acc, item) => {
        const key = `${item.FileUID}-${item.FileName}`;

        if (!acc[key]) {
            acc[key] = {
                FileUID: item.FileUID,
                FileName: item.FileName,
                FileVersion:item.FileVersion,
                SiteID:item.SiteID,
                FileSize:item.FileSize,
                Users: []
            };
        }

        acc[key].Users.push({
            User: item.ShareWithOthers,
            UserID: item.UserID,
            PermissionType:item.PermissionType,
            ShareAt:item.ShareAt
        });

        return acc;
    }, {})

  // Convert the result back to an array
  const result = [];
  for (let key in groupedData) {
     result.push(groupedData[key]);
  }
  
  console.log("DMSShareWithOtherMaster",DMSShareWithOtherMaster);
  console.log("result",result);
  const container = document.getElementById("files-container");
  container.innerHTML="";

  routeToDiffSideBar="shareWithOthers"
  let filteredFileData=[];
  if(searchText !== null){
    filteredFileData=result.filter((file: any) => file?.FileName?.toLowerCase().includes(searchText?.value?.toLowerCase()))
    if(filteredFileData.length === 0 && searchText !== null){
      console.log("combineArray",filteredFileData);
      fileNotFound(`No file match ${searchText.value}`);
    }
  }else{
    filteredFileData=result;
  }

  filteredFileData.forEach((file)=>{

    // Get the first two users
    const firstTwoUsers = file.Users.slice(0, 2);
    // Remaining users count
    const moreUsersCount = file.Users.length - 2;

    // Create shared users HTML for the first two users
    let sharedUsersHTML = firstTwoUsers.map((user:any) => {
      let firstNameInitial = "";
      let lastNameInitial = "";

      if (user.User) {
        const nameParts = user.User.split(" ");  
        // Assign initials based on the number of name parts
        if (nameParts.length > 0) {
            firstNameInitial = nameParts[0].charAt(0).toUpperCase();
        }
        if (nameParts.length > 1) {
            // Use the last part as the last name initial
            lastNameInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
        }
      }

      return `<span class="shared-user">${firstNameInitial}${lastNameInitial}</span>`;
    })
    .join("");
 
    // If there are more users, add "+more"
    if (moreUsersCount > 0) {
        sharedUsersHTML += `<span class="more-users">+${moreUsersCount} more</span>`;
    }
    const {fileIcon, fileExtension}= getFileIcon(file.FileName);
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.fileId = file.FileUID; 
    card.dataset.listId = file.SiteID;
        
    card.innerHTML = `        
      <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
      <p class="p1st">${file.FileName}</p>
      <div class="fileSizeAndVersion">
      <p class="p3rd">${file.FileSize} MB</p>
      <p class="p2nd">${file.FileVersion}</p>
      </div>
      <div class="sharedFile">
        ${sharedUsersHTML}
      </div>
    `;
    container.appendChild(card);
  })
  // End

  // const FilesItems = await sp.web.lists
  // .getByTitle("MasterSiteURL")
  // .items.select("Title", "SiteID", "FileMasterList", "Active")
  // .filter(`Active eq 'Yes'`)();

  // console.log("Files items", FilesItems);
  // FilesItems.forEach(async(fileItem)=>{
  //   if(fileItem.FileMasterList !== null){
  //     // console.log(files.FileMasterList);

  //     const filesData = await sp.web.lists
  //     .getByTitle(`${fileItem.FileMasterList}`)
  //     .items.select("FileName", "FileUID", "FileSize", "FileVersion","ShareWithOthers")
  //     .filter(
  //       `CurrentUser eq '${currentUserEmailRef.current}'`
  //     )();

      
  //     console.log("Files Data ",filesData);
  //     routeToDiffSideBar="shareWithOthers"
  //     let filteredFileData=[];
  //     if(searchText !== null){
  //           filteredFileData=filesData.filter((file: any) => file?.FileName?.toLowerCase().includes(searchText?.value?.toLowerCase()))
  //     }else{
  //       filteredFileData=filesData;
  //     }
  //     filteredFileData.forEach((file) => {

  //       if( file.ShareWithOthers !== null ){

  //         const sharedUserInTheFormOFstring = file.ShareWithOthers; 
      
  //         let sharedUsers = JSON.parse(sharedUserInTheFormOFstring);

  //         if(sharedUsers.length === 0){
  //             return;
  //         }
          
  //         // Get the first two users
  //         const firstTwoUsers = sharedUsers.slice(0, 2);

  //         // Remaining users count
  //         const moreUsersCount = sharedUsers.length - 2;

  //         // Create shared users HTML for the first two users
  //         let sharedUsersHTML = firstTwoUsers
  //             .map((user:any) => {
  //                 let firstNameInitial;
  //                 let lastNameInitial=""
  //                 if(user.FirstName !== null){
  //                       firstNameInitial = user.FirstName.charAt(0).toUpperCase();
  //                 }
  //                 if(user.LastName !== null){
  //                       lastNameInitial=user.LastName.charAt(0).toUpperCase(); 
  //                 }

  //                 return `<span class="shared-user">${firstNameInitial}${lastNameInitial}</span>`;
  //                 })
  //                 .join("");

                
  //         // If there are more users, add "+more"
  //         if (moreUsersCount > 0) {
  //               sharedUsersHTML += `<span class="more-users">+${moreUsersCount} more</span>`;
  //         }
         
  //         const {fileIcon, fileExtension}= getFileIcon(file.FileName);
  //         // const card = createFileCard(file, fileIcon, fileItem.SiteID,fileItem.FileMasterList,fileExtension);
  //         const card = document.createElement("div");
  //         card.className = "card";
  //         card.dataset.fileId = file.FileUID; // Store file ID in the card element
  //         card.dataset.listId = fileItem.SiteID; // Store site ID
        
  //         card.innerHTML = `        
  //           <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
  //           <p class="p1st">${file.FileName}</p>
  //           <div class="fileSizeAndVersion">
  //             <p class="p3rd">${file.FileSize} MB</p>
  //             <p class="p2nd">${file.FileVersion}</p>
  //           </div>
  //            <div class="sharedFile">
  //             ${sharedUsersHTML}
  //           </div>
  //         `;
  //         container.appendChild(card);

  //       }
  //     });
      
  //   }        
  // })

}
// const ShareWithMe=async(event:React.MouseEvent<HTMLButtonElement>=null,searchText:HTMLInputElement=null)=>{
//   if(event){
//     event.preventDefault();
//     event.stopPropagation();
//   }      
//   console.log("Share with me called");
//   console.log("searchInput",searchText);

//   // New Code Start
//   const DMSShareWithOtherMaster= await sp.web.lists
//   .getByTitle("DMSShareWithOtherMaster")
//   .items.select("FileName", "FileUID", "FileVersion", "FileSize","CurrentUser","DocumentLibraryName","CurrentFolderPath","ShareWithMe","Status","SiteID","SiteName","FilePreviewURL","ShareAt","UserID","PermissionType")();
//   // console.log("DMSShareWithOtherMaster1",DMSShareWithOtherMaster);

//   const filteredFiles= DMSShareWithOtherMaster.filter(file => file.ShareWithMe === currentUserEmailRef.current);

//   const uniqueItems = filteredFiles.filter((item, index, self) =>
//     index === self.findIndex((i) => i.FileUID === item.FileUID)
//   );
// console.log("uniqueItems",uniqueItems);
//   // console.log("filteredFileData",filteredFiles);

//   // const DMSShareWithOtherMaster= await sp.web.lists
//   // .getByTitle("DMSShareWithOtherMaster")
//   // .items.select("FileName", "FileUID", "FileVersion", "FileSize","CurrentUser","DocumentLibraryName","CurrentFolderPath","ShareWithMe","Status","SiteID","SiteName","FilePreviewURL","ShareAt","UserID","PermissionType")
//   // .filter(`CurrentUser ne '${currentUserEmailRef.current}'`)();
//   // console.log("DMSShareWithOtherMaster",DMSShareWithOtherMaster);

//   // const groupedData =DMSShareWithOtherMaster.reduce((acc, item) => {
//   //   const key = `${item.FileUID}-${item.FileName}`;

//   //     if (!acc[key]) {
//   //           acc[key] = {
//   //               FileUID: item.FileUID,
//   //               FileName: item.FileName,
//   //               FileVersion:item.FileVersion,
//   //               SiteID:item.SiteID,
//   //               FileSize:item.FileSize,
//   //               CurrentFolderPath:item.CurrentFolderPath,
//   //               DocumentLibraryName:item.DocumentLibraryName,
//   //               CurrentUser:item.CurrentUser,
//   //               Users: []
//   //           };
//   //       }

//   //       acc[key].Users.push({
//   //           User: item.ShareWithMe,
//   //           UserID: item.UserID,
//   //           PermissionType:item.PermissionType,
//   //           ShareAt:item.ShareAt
//   //       });

//   //       return acc;
//   //   }, {})

//   // // Convert the result back to an array
//   // const result = [];
//   // for (let key in groupedData) {
//   //   result.push(groupedData[key]);
//   // }

//   // console.log("result",result);
//   // const user = await sp.web.ensureUser(currentUserEmailRef.current);
//   // const userIDToFind = String(user.data.Id);
//   // console.log("userIDToFind",userIDToFind);

//   // const filteredFiles = result.filter(file =>
//   //   file.Users.some((user:any) => user.UserID === userIDToFind)
//   // );

//   const container = document.getElementById("files-container");
//   container.innerHTML="";

//   console.log("Files Share with me",filteredFiles);
//   routeToDiffSideBar="shareWithMe";
//   let filteredFileData=[];
//   if(searchText !== null){
//     filteredFileData=uniqueItems.filter((file: any) => file?.FileName?.toLowerCase().includes(searchText?.value?.toLowerCase()))
//   }else{
//     filteredFileData=uniqueItems;
//   }
//   filteredFileData.forEach((file)=>{
//     const {fileIcon, fileExtension}= getFileIcon(file.FileName);
//     // console.log("file-Details",file);
//     const card = document.createElement("div");
//     card.className = "card";
//     card.dataset.fileId = file.FileUID; 
//     card.dataset.listId = file.SiteID; 
            
//     card.innerHTML = `        
//       <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
//       <p class="p1st">${file.FileName}</p>
//       <div class="fileSizeAndVersion">
//       <p class="p3rd">${file.FileSize} MB</p>
//       <p class="p2nd">${file.FileVersion}</p>
//       </div>
//       <div id="three-dots" class="three-dots" onclick="shareWithMePopUp('${file.FileUID}','${file.SiteID}','${file.CurrentFolderPath}','${file.FileName}')">
//       <span>...</span>
//       </div>
//     `;
//     const menu = document.createElement("div");
//     menu.id = `menu-${file.FileUID}`;
//     menu.className = "popup-menu";
//     menu.innerHTML = `
//       <ul>
//         <li onclick="PreviewFile('${file.CurrentFolderPath}/${file.FileName}', '${file.SiteID}','${file.DocumentLibraryName}')">
//           <img src=${ShareFile} alt="Share"/> File Preview
//         </li>
//         <li onclick="shareFile('${file.FileUID}', '${file.SiteID}','${file.CurrentFolderPath}','${file.FileName}','ShareWithMe','${file.FileVersion}','${file.FileSize}','${file.Status}','${file.FilePreviewURL}','${file.DocumentLibraryName}')">
//           <img src=${ShareFile} alt="Share"/> Share
//         </li>
//         <li onclick="DownloadFile('${file.FileUID}', '${file.SiteID}')">
//           <img src=${ShareFile} alt="Share"/> Download File                 
//         </li>
//       </ul>
//     `;
            
//     card.appendChild(menu);        
//     container.appendChild(card);
//   })
//   // End
  

//   // const FilesItems = await sp.web.lists
//   // .getByTitle("MasterSiteURL")
//   // .items.select("Title", "SiteID", "FileMasterList", "Active")
//   // .filter(`Active eq 'Yes'`)();
  
//   // console.log("MasterSite Items",FilesItems);

// //   FilesItems.forEach(async(fileItem)=>{

// //     if(fileItem.FileMasterList !== null){
// //       // console.log(files.FileMasterList);

// //       const filesData = await sp.web.lists
// //       .getByTitle(`${fileItem.FileMasterList}`)
// //       .items.select("FileName", "FileUID", "FileSize", "FileVersion","ShareWithMe","CurrentFolderPath","DocumentLibraryName","SiteName","FilePreviewURL")
// //       .filter(
// //         `CurrentUser ne '${currentUserEmailRef.current}'`
// //       )();

      
// //       console.log("Files Data ",filesData);
// //       routeToDiffSideBar="shareWithMe";
// //       let filteredFileData=[];
// //       if(searchText !== null){
// //             filteredFileData=filesData.filter((file: any) => file?.FileName?.toLowerCase().includes(searchText?.value?.toLowerCase()))
// //       }else{
// //         filteredFileData=filesData;
// //       }
// //       filteredFileData.forEach((file)=>{
// //         if( file.ShareWithMe !== null ){
// //           // console.log("FilesMe",file)
// //           const sharedUserInTheFormOFstring = file.ShareWithMe; 
      
// //           let sharedUsers = JSON.parse(sharedUserInTheFormOFstring);

// //           if(sharedUsers.length === 0){
// //               return;
// //           }

// //           let fileShareWithMe=sharedUsers.find( (item:any) => 
// //             {
// //               //  console.log(item.SharedWith);
// //               //  console.log("current User",currentUserEmailRef.current)
// //                return item.SharedWith === currentUserEmailRef.current
// //             }
// //           )

// //           // console.log("files share with me =>",fileShareWithMe);
// //           // add later these pop option
// //           // <li onclick="confirmDeleteFile('${file.FileUID}')">
// //           // <img src=${deleteIcon} alt="Delete"/> Delete
// //           // </li>
// //           // <li onclick="shareFile('${file.FileUID}', '${fileItem.SiteID}','${file.CurrentFolderPath}','${file.FileName}','ShareWithMe')">
// //           // <img src=${ShareFile} alt="Share"/> Share
// //           // </li>
// //           // <li onclick="auditHistory('${file.FileUID}', '${fileItem.SiteID}','${file.CurrentFolderPath}','${file.SiteName}')">
// //           // <img src=${ShareFile} alt="Share"/> Audit History
// //           // </li>
// //           // <li onclick="DownloadFile('${file.FileUID}', '${fileItem.SiteID}')">
// //           // <img src=${ShareFile} alt="Share"/> Download File                 
// //           // </li>
// //           if( fileShareWithMe !== undefined ){

// //             console.log("This File is Share With me By Other Users",file.FileName);
            
// //             const {fileIcon, fileExtension}= getFileIcon(file.FileName);
// //             console.log("file-Details",file);
// //             const card = document.createElement("div");
// //             card.className = "card";
// //             card.dataset.fileId = file.FileUID; // Store file ID in the card element
// //             card.dataset.listId = fileItem.SiteID; // Store site ID
            
// //             card.innerHTML = `        
// //               <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
// //               <p class="p1st">${file.FileName}</p>
// //               <div class="fileSizeAndVersion">
// //                 <p class="p3rd">${file.FileSize} MB</p>
// //                 <p class="p2nd">${file.FileVersion}</p>
// //               </div>
// //               <div id="three-dots" class="three-dots" onclick="shareWithMePopUp('${file.FileUID}','${fileItem.SiteID}','${file.CurrentFolderPath}','${file.FileName}')">
// //                 <span>...</span>
// //               </div>
// //               `;
// //             // new code added
// //               const menu = document.createElement("div");
// //               menu.id = `menu-${file.FileUID}`;
// //               menu.className = "popup-menu";
// //               menu.innerHTML = `
// //                 <ul>
// //                   <li onclick="PreviewFile('${file.CurrentFolderPath}/${file.FileName}', '${fileItem.SiteID}','${file.DocumentLibraryName}')">
// //                     <img src=${ShareFile} alt="Share"/> File Preview
// //                   </li>
// //                 </ul>
// //               `;
            
// //               card.appendChild(menu);
            
// //             container.appendChild(card);

// //           }

// //         }
// //       })

// //     }

// // })

// }
 //Toggle the menu card for share with me
 // @ts-ignore
 const ShareWithMe=async(event:React.MouseEvent<HTMLButtonElement>=null,searchText:HTMLInputElement=null)=>{
  if(event){
    event.preventDefault();
    event.stopPropagation();
  }      
  
    // clean the url start
    const newUrl = `${window.location.origin}${window.location.pathname}`;
    window.history.pushState(null, '', newUrl)
    // New code to hide the create file and folder button start
    if(createFileButton2){
      createFileButton2.style.display = 'none'
      }
      if(createFileButton){
      createFileButton.style.display = 'none'
      }
    //End 
    // end
    // New Code Start
    const DMSShareWithOtherMaster= await sp.web.lists
    .getByTitle("DMSShareWithOtherMaster")
    .items.select("FileName", "FileUID", "FileVersion", "FileSize","CurrentUser","DocumentLibraryName","CurrentFolderPath","ShareWithMe","Status","SiteID","SiteName","FilePreviewURL","ShareAt","UserID","PermissionType")
    .orderBy("Created", false)
    ();
  const filteredFiles= DMSShareWithOtherMaster.filter(file => file.ShareWithMe === currentUserEmailRef.current);

  const uniqueItems = filteredFiles.filter((item, index, self) =>
    index === self.findIndex((i) => i.FileUID === item.FileUID)
  );
console.log("uniqueItems",uniqueItems);
  // console.log("filteredFileData",filteredFiles);

  // const DMSShareWithOtherMaster= await sp.web.lists
  // .getByTitle("DMSShareWithOtherMaster")
  // .items.select("FileName", "FileUID", "FileVersion", "FileSize","CurrentUser","DocumentLibraryName","CurrentFolderPath","ShareWithMe","Status","SiteID","SiteName","FilePreviewURL","ShareAt","UserID","PermissionType")
  // .filter(`CurrentUser ne '${currentUserEmailRef.current}'`)();
  // console.log("DMSShareWithOtherMaster",DMSShareWithOtherMaster);

  // const groupedData =DMSShareWithOtherMaster.reduce((acc, item) => {
  //   const key = `${item.FileUID}-${item.FileName}`;

  //     if (!acc[key]) {
  //           acc[key] = {
  //               FileUID: item.FileUID,
  //               FileName: item.FileName,
  //               FileVersion:item.FileVersion,
  //               SiteID:item.SiteID,
  //               FileSize:item.FileSize,
  //               CurrentFolderPath:item.CurrentFolderPath,
  //               DocumentLibraryName:item.DocumentLibraryName,
  //               CurrentUser:item.CurrentUser,
  //               Users: []
  //           };
  //       }

  //       acc[key].Users.push({
  //           User: item.ShareWithMe,
  //           UserID: item.UserID,
  //           PermissionType:item.PermissionType,
  //           ShareAt:item.ShareAt
  //       });

  //       return acc;
  //   }, {})

  // // Convert the result back to an array
  // const result = [];
  // for (let key in groupedData) {
  //   result.push(groupedData[key]);
  // }

  // console.log("result",result);
  // const user = await sp.web.ensureUser(currentUserEmailRef.current);
  // const userIDToFind = String(user.data.Id);
  // console.log("userIDToFind",userIDToFind);

  // const filteredFiles = result.filter(file =>
  //   file.Users.some((user:any) => user.UserID === userIDToFind)
  // );

  const container = document.getElementById("files-container");
  container.innerHTML="";

  console.log("Files Share with me",filteredFiles);
  routeToDiffSideBar="shareWithMe";
  let filteredFileData=[];
  if(searchText !== null){
    filteredFileData=uniqueItems.filter((file: any) => file?.FileName?.toLowerCase().includes(searchText?.value?.toLowerCase()))
    if(filteredFileData.length === 0 && searchText !== null){
      console.log("combineArray",filteredFileData);
      fileNotFound(`No file match ${searchText.value}`);
    }
  }else{
    filteredFileData=uniqueItems;
  }
  filteredFileData.forEach((file)=>{
    const {fileIcon, fileExtension}= getFileIcon(file.FileName);
    // console.log("file-Details",file);
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.fileId = file.FileUID;
    card.dataset.listId = file.SiteID;
           
    card.innerHTML = `        
      <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
      <p class="p1st">${file.FileName}</p>
      <div class="fileSizeAndVersion">
      <p class="p3rd">${file.FileSize} MB</p>
      <p class="p2nd">${file.FileVersion}</p>
      </div>
      <div id="three-dots" class="three-dots" onclick="shareWithMePopUp('${file.FileUID}','${file.SiteID}','${file.CurrentFolderPath}','${file.FileName}')">
      <span>...</span>
      </div>
    `;
    const menu = document.createElement("div");
    menu.id = `menu-${file.FileUID}`;
    menu.className = "popup-menu";
    // menu.innerHTML = `
    //   <ul>
    //     <li onclick="PreviewFile('${file.CurrentFolderPath}/${file.FileName}', '${file.SiteID}','${file.DocumentLibraryName}')">
    //       <img src=${ShareFile} alt="Share"/> File Preview
    //     </li>
    //     <li onclick="shareFile('${file.FileUID}', '${file.SiteID}','${file.CurrentFolderPath}','${file.FileName}','ShareWithMe','${file.FileVersion}','${file.FileSize}','${file.Status}','${file.FilePreviewURL}','${file.DocumentLibraryName}')">
    //       <img src=${ShareFile} alt="Share"/> Share
    //     </li>
    //     <li onclick="DownloadFile('${file.FileUID}', '${file.SiteID}')">
    //       <img src=${ShareFile} alt="Share"/> Download File                
    //     </li>
    //   </ul>
    // `;
    // menu.innerHTML = `
    //   <ul>
    //     <li onclick="PreviewFile('${file.CurrentFolderPath}/${file.FileName}', '${file.SiteID}','${file.DocumentLibraryName}')">
    //       <img src=${ShareFile} alt="Share"/> File Preview
    //     </li>

    //     <li onclick="DownloadFile('${file.FileUID}', '${file.SiteID}')">
    //       <img src=${ShareFile} alt="Share"/> Download File                
    //     </li>
    //   </ul>
    // `;
    menu.innerHTML = `
    <ul>
      <li onclick="PreviewFile('${file.CurrentFolderPath}/${file.FileName}', '${file.SiteID}','${file.DocumentLibraryName}')">
        <img src=${ShareFile} alt="Share"/> File Preview
      </li>

      <li onclick="DownloadFile('${file.FileUID}', '${file.SiteID}')">
        <img src=${downloadicon} alt="Share"/> Download File                
      </li>
    </ul>
  `;  
    card.appendChild(menu);        
    container.appendChild(card);
  })
  // End
 

  // const FilesItems = await sp.web.lists
  // .getByTitle("MasterSiteURL")
  // .items.select("Title", "SiteID", "FileMasterList", "Active")
  // .filter(`Active eq 'Yes'`)();
 
  // console.log("MasterSite Items",FilesItems);

//   FilesItems.forEach(async(fileItem)=>{

//     if(fileItem.FileMasterList !== null){
//       // console.log(files.FileMasterList);

//       const filesData = await sp.web.lists
//       .getByTitle(`${fileItem.FileMasterList}`)
//       .items.select("FileName", "FileUID", "FileSize", "FileVersion","ShareWithMe","CurrentFolderPath","DocumentLibraryName","SiteName","FilePreviewURL")
//       .filter(
//         `CurrentUser ne '${currentUserEmailRef.current}'`
//       )();

     
//       console.log("Files Data ",filesData);
//       routeToDiffSideBar="shareWithMe";
//       let filteredFileData=[];
//       if(searchText !== null){
//             filteredFileData=filesData.filter((file: any) => file?.FileName?.toLowerCase().includes(searchText?.value?.toLowerCase()))
//       }else{
//         filteredFileData=filesData;
//       }
//       filteredFileData.forEach((file)=>{
//         if( file.ShareWithMe !== null ){
//           // console.log("FilesMe",file)
//           const sharedUserInTheFormOFstring = file.ShareWithMe;
     
//           let sharedUsers = JSON.parse(sharedUserInTheFormOFstring);

//           if(sharedUsers.length === 0){
//               return;
//           }

//           let fileShareWithMe=sharedUsers.find( (item:any) =>
//             {
//               //  console.log(item.SharedWith);
//               //  console.log("current User",currentUserEmailRef.current)
//                return item.SharedWith === currentUserEmailRef.current
//             }
//           )

//           // console.log("files share with me =>",fileShareWithMe);
//           // add later these pop option
//           // <li onclick="confirmDeleteFile('${file.FileUID}')">
//           // <img src=${deleteIcon} alt="Delete"/> Delete
//           // </li>
//           // <li onclick="shareFile('${file.FileUID}', '${fileItem.SiteID}','${file.CurrentFolderPath}','${file.FileName}','ShareWithMe')">
//           // <img src=${ShareFile} alt="Share"/> Share
//           // </li>
//           // <li onclick="auditHistory('${file.FileUID}', '${fileItem.SiteID}','${file.CurrentFolderPath}','${file.SiteName}')">
//           // <img src=${ShareFile} alt="Share"/> Audit History
//           // </li>
//           // <li onclick="DownloadFile('${file.FileUID}', '${fileItem.SiteID}')">
//           // <img src=${ShareFile} alt="Share"/> Download File                
//           // </li>
//           if( fileShareWithMe !== undefined ){

//             console.log("This File is Share With me By Other Users",file.FileName);
           
//             const {fileIcon, fileExtension}= getFileIcon(file.FileName);
//             console.log("file-Details",file);
//             const card = document.createElement("div");
//             card.className = "card";
//             card.dataset.fileId = file.FileUID; // Store file ID in the card element
//             card.dataset.listId = fileItem.SiteID; // Store site ID
           
//             card.innerHTML = `        
//               <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
//               <p class="p1st">${file.FileName}</p>
//               <div class="fileSizeAndVersion">
//                 <p class="p3rd">${file.FileSize} MB</p>
//                 <p class="p2nd">${file.FileVersion}</p>
//               </div>
//               <div id="three-dots" class="three-dots" onclick="shareWithMePopUp('${file.FileUID}','${fileItem.SiteID}','${file.CurrentFolderPath}','${file.FileName}')">
//                 <span>...</span>
//               </div>
//               `;
//             // new code added
//               const menu = document.createElement("div");
//               menu.id = `menu-${file.FileUID}`;
//               menu.className = "popup-menu";
//               menu.innerHTML = `
//                 <ul>
//                   <li onclick="PreviewFile('${file.CurrentFolderPath}/${file.FileName}', '${fileItem.SiteID}','${file.DocumentLibraryName}')">
//                     <img src=${ShareFile} alt="Share"/> File Preview
//                   </li>
//                 </ul>
//               `;
           
//               card.appendChild(menu);
           
//             container.appendChild(card);

//           }

//         }
//       })

//     }

// })

}

//@ts-ignore
//  window.shareWithMePopUp = async function(fileId: string , siteID:any , FolderPath:any , FileName:any) {
//   console.log("Inside the shareWithMePopUp");
//   console.log(siteID, "siteID")
//   console.log(fileId , "fileId")
//   console.log(FolderPath , "folderPath")
//   console.log(FileName , "fileName")
  
//   // check user permission on item start
//   const testidsub =await sp.site.openWebById(siteID);
//   let filePermission:string;
//   let filePath=`${FolderPath}/${FileName}`;
//   console.log("filePath",filePath);
//   const fileServerRelativePath = testidsub.web.getFileByServerRelativePath(filePath);
//   // Retrieve the list item associated with the file
//   const item = await fileServerRelativePath.getItem();
//   console.log("items",item);
//   // Get current user permissions on the item (file)
//   const filePermissions = await item.getCurrentUserEffectivePermissions(); 
//   console.log("File permissions:", filePermissions);

//   const hasFullControl = testidsub.web.hasPermissions(filePermissions, PermissionKind.ManageWeb);
//   const hasEdit = testidsub.web.hasPermissions(filePermissions, PermissionKind.EditListItems);
//   const hasContribute = testidsub.web.hasPermissions(filePermissions, PermissionKind.AddListItems) && testidsub.web.hasPermissions(filePermissions, PermissionKind.EditListItems);
//   const hasRead = testidsub.web.hasPermissions(filePermissions, PermissionKind.ViewListItems);
//   console.log(hasFullControl , "hasFullControl")
//   console.log(hasEdit , "hasEdit")
//   console.log(hasContribute , "hasContribute")
//   console.log(hasRead , "hasRead")

//   if (hasFullControl) {
//     filePermission ="Full Control";
//   } else if (hasEdit) {
//     filePermission ="Edit";
//   } else if (hasContribute) {
//     filePermission = "Contribute";
//   } else if (hasRead) {
//     filePermission = "Read";
//   } else {
//     filePermission = "No Access";
//   }

//   console.log("filePermission",filePermission);
//   // check user permission on item End

// // console.log("enter here i n menu card")
// const allMenus = document.querySelectorAll('.popup-menu');
// console.log(allMenus , "allMenus")
// allMenus.forEach(menu => {
//   // console.log(menu , "menu")
//   // console.log(menu.id , "menu.id")
//   // console.log(fileId , "fileId")
//   if (menu.id !== `menu-${fileId}`) {
//     menu.classList.remove("show");
//   }
// });

// // Toggle the menu for the clicked card
// const menu = document.getElementById(`menu-${fileId}`);
// if (menu) {
//   const menu = document.getElementById(`menu-${fileId}`);
//   if (!menu) return; 
// // if (filePermission === "Edit" || filePermission === "Contribute" || filePermission === "Read") {
// // }
//   const secondItem = menu.children[0]?.children[1] as HTMLElement;
//   const secondItem3 = menu.children[0]?.children[2] as HTMLElement;
//   if (filePermission === "Read" && secondItem && secondItem.style.display !== "none") {
//         secondItem.style.display = "none";
//   }
//   if (filePermission === "Read" && secondItem3 && secondItem3.style.display !== "none") {
//       secondItem3.style.display = "none";
//   }
//   menu.classList.toggle("show");
// }


// document.addEventListener('click', (event) => {

//   // console.log("Outside click Event Called");

//   const target = event.target as HTMLElement;

//   // Check if the click was inside any menu or three-dot icon
//   const isClickInsideMenu = target.closest('.popup-menu');
//   const isClickInsideThreeDots = target.closest('.three-dots');

//   // console.log("This is nested folder",isClickInsideThreeDots);

//   if (!isClickInsideMenu && !isClickInsideThreeDots) {
//     const allMenus = document.querySelectorAll('.popup-menu');
//     allMenus.forEach(menu => {
//       menu.classList.remove('show');
//     });
//   }
// });
// }
window.shareWithMePopUp = async function(fileId: string , siteID:any , FolderPath:any , FileName:any) {
  console.log("Inside the shareWithMePopUp");
  console.log(siteID, "siteID")
  console.log(fileId , "fileId")
  console.log(FolderPath , "folderPath")
  console.log(FileName , "fileName")
  
  // check user permission on item start
  const testidsub =await sp.site.openWebById(siteID);
  let filePermission:string;
  let filePath=`${FolderPath}/${FileName}`;
  console.log("filePath",filePath);
  const fileServerRelativePath = testidsub.web.getFileByServerRelativePath(filePath);
  // Retrieve the list item associated with the file
  const item = await fileServerRelativePath.getItem();
  console.log("items",item);
  // Get current user permissions on the item (file)
  const filePermissions = await item.getCurrentUserEffectivePermissions(); 
  console.log("File permissions:", filePermissions);

  const hasFullControl = testidsub.web.hasPermissions(filePermissions, PermissionKind.ManageWeb);
  const hasEdit = testidsub.web.hasPermissions(filePermissions, PermissionKind.EditListItems);
  const hasContribute = testidsub.web.hasPermissions(filePermissions, PermissionKind.AddListItems) && testidsub.web.hasPermissions(filePermissions, PermissionKind.EditListItems);
  const hasRead = testidsub.web.hasPermissions(filePermissions, PermissionKind.ViewListItems);
  console.log(hasFullControl , "hasFullControl")
  console.log(hasEdit , "hasEdit")
  console.log(hasContribute , "hasContribute")
  console.log(hasRead , "hasRead")

  if (hasFullControl) {
    filePermission ="Full Control";
  } else if (hasEdit) {
    filePermission ="Edit";
  } else if (hasContribute) {
    filePermission = "Contribute";
  } else if (hasRead) {
    filePermission = "Read";
  } else {
    filePermission = "No Access";
  }

  console.log("filePermission",filePermission);
  // check user permission on item End

// console.log("enter here i n menu card")
const allMenus = document.querySelectorAll('.popup-menu');
console.log(allMenus , "allMenus")
allMenus.forEach(menu => {
  // console.log(menu , "menu")
  // console.log(menu.id , "menu.id")
  // console.log(fileId , "fileId")
  if (menu.id !== `menu-${fileId}`) {
    menu.classList.remove("show");
  }
});

// Toggle the menu for the clicked card
const menu = document.getElementById(`menu-${fileId}`);
if (menu) {
  const menu = document.getElementById(`menu-${fileId}`);
  if (!menu) return; 
// if (filePermission === "Edit" || filePermission === "Contribute" || filePermission === "Read") {
// }
  const secondItem = menu.children[0]?.children[1] as HTMLElement;
  // const secondItem3 = menu.children[0]?.children[2] as HTMLElement;
  if (filePermission === "Read" && secondItem && secondItem.style.display !== "none") {
        secondItem.style.display = "none";
  }
  // if (filePermission === "Read" && secondItem3 && secondItem3.style.display !== "none") {
  //     secondItem3.style.display = "none";
  // }
  menu.classList.toggle("show");
}


document.addEventListener('click', (event) => {

  // console.log("Outside click Event Called");

  const target = event.target as HTMLElement;

  // Check if the click was inside any menu or three-dot icon
  const isClickInsideMenu = target.closest('.popup-menu');
  const isClickInsideThreeDots = target.closest('.three-dots');

  // console.log("This is nested folder",isClickInsideThreeDots);

  if (!isClickInsideMenu && !isClickInsideThreeDots) {
    const allMenus = document.querySelectorAll('.popup-menu');
    allMenus.forEach(menu => {
      menu.classList.remove('show');
    });
  }
});
}
// const ShareWithMe=async(event:React.MouseEvent<HTMLButtonElement>=null,searchText:HTMLInputElement=null)=>{
//   const wait = document.getElementById('files-container')
//   wait.classList.remove('hidemydatacards')
//   if(createFileButton2){
//     createFileButton2.style.display = 'none'
//     }
//     if(createFileButton){
//     createFileButton.style.display = 'none'
//     }
//     const hidegidvewlistviewbutton = document.getElementById('hidegidvewlistviewbutton')
//     if (hidegidvewlistviewbutton) {
//      console.log("enter here .....................")
//      hidegidvewlistviewbutton.style.display = 'none'
    
//    }
//   if(event){
//     event.preventDefault();
//     event.stopPropagation();
//   }      
//   console.log("Share with me called");
//   console.log("searchInput",searchText);
//   const container = document.getElementById("files-container");
//   container.innerHTML="";

//   const FilesItems = await sp.web.lists
//   .getByTitle("MasterSiteURL")
//   .items.select("Title", "SiteID", "FileMasterList", "Active")
//   .filter(`Active eq 'Yes'`)();
 
//   console.log("MasterSite Items",FilesItems);

//   FilesItems.forEach(async(fileItem)=>{

//     if(fileItem.FileMasterList !== null){
//       const filesData = await sp.web.lists
//       .getByTitle(`${fileItem.FileMasterList}`)
//       .items.select("FileName", "FileUID", "FileSize", "FileVersion","ShareWithMe")
//       .filter(
//         `CurrentUser ne '${currentUserEmailRef.current}'`
//       )();

     
//       console.log("Files Data ",filesData);
//       routeToDiffSideBar="shareWithMe";
//       let filteredFileData=[];
//       if(searchText !== null){
//             filteredFileData=filesData.filter((file: any) => file?.FileName?.toLowerCase().includes(searchText?.value?.toLowerCase()))
//       }else{
//         filteredFileData=filesData;
//       }
//       filteredFileData.forEach((file)=>{
//         if( file.ShareWithMe !== null ){

//           const sharedUserInTheFormOFstring = file.ShareWithMe;
     
//           let sharedUsers = JSON.parse(sharedUserInTheFormOFstring);

//           if(sharedUsers.length === 0){
//               return;
//           }

//           let fileShareWithMe=sharedUsers.find( (item:any) =>
//             {
          
//                return item.SharedWith === currentUserEmailRef.current
//             }
//           )

         


//           if( fileShareWithMe !== undefined ){

//             console.log("This File is Share With me By Other Users",file.FileName);
           
//             const {fileIcon, fileExtension}= getFileIcon(file.FileName);

//             const card = document.createElement("div");
//             card.className = "card";
//             card.dataset.fileId = file.FileUID; 
//             card.dataset.listId = fileItem.SiteID; 
         
//             card.innerHTML = `        
//               <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
//               <p class="p1st">${file.FileName}</p>
//               <div class="fileSizeAndVersion">
//                 <p class="p3rd">${file.FileSize} MB</p>
//                 <p class="p2nd">${file.FileVersion}</p>
//               </div>`;

//             container.appendChild(card);

//           }

//         }
//       })

//     }

// })

// }

// 



const Recyclebin=async (event:React.MouseEvent<HTMLButtonElement>=null, siteIdToUpdate: string = null,    searchText:any = null)=>{
  if(event){
    event.preventDefault();
    event.stopPropagation();
  }

  const container = document.getElementById("files-container");
  if(siteIdToUpdate ===  null){
    container.innerHTML="";
  }

  const FilesItems = await sp.web.lists
  .getByTitle("MasterSiteURL")
  .items.select("Title", "SiteID", "FileMasterList", "Active")
  .filter(`Active eq 'Yes'`)();

  FilesItems.forEach(async (fileItem) => {
    if (fileItem.FileMasterList !== null) {

      if (siteIdToUpdate && fileItem.SiteID !== siteIdToUpdate) {
        return;
      }

      console.log("fileItem.FileMasterList",fileItem.FileMasterList);
      const filesData = await sp.web.lists
        .getByTitle(`${fileItem.FileMasterList}`)
        .items.select("ID" , "FileName", "FileUID", "FileSize", "FileVersion" ,"Status" , "SiteID","CurrentFolderPath","DocumentLibraryName","SiteName","FilePreviewURL","IsDeleted")
        .filter(
          `CurrentUser eq '${currentUserEmailRef.current}'`
        )();

        const listElements = document.querySelectorAll(
          `[data-list-id='${fileItem.SiteID}']`
        );
        console.log("ListElemet To update",listElements)
        listElements.forEach((el) => el.remove());
      
      console.log("files",filesData);

       routeToDiffSideBar="recyclebin";
       let filteredFileData;
       if(searchText !== null){
         filteredFileData=filesData.filter((file: any) => file.FileName.toLowerCase().includes(searchText.value.toLowerCase()))
       }else{
         filteredFileData=filesData;
       }

       filteredFileData.forEach((file)=>{
        if(file.IsDeleted !== null){
          const card = document.createElement("div");
          let fileIcon;
          const fileExtension = file.FileName?.split(".").pop().toLowerCase();
          switch (fileExtension) {
            case "doc":
            case "docx":
              fileIcon = Docicon;
              break;
            case "txt":
              fileIcon = Txticon;
              break;
            case "pdf":
              fileIcon = Pdficon;
              break;
            case "xls":
            case "xlsx":
              fileIcon = Xlsicon;
              break;
            case "zip":
              fileIcon = Zipicon;
              break;
            default:
              fileIcon = Docicon; 
              break;
          }
      
          card.className = "card";
          card.dataset.listId = file.SiteID;
          card.innerHTML = `         
            <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
            <p class="p1st">${file.FileName}</p>
            <p class="p2nd"></p>
            <p class="p3rd">${file.FileSize}</p>
            <div class="three-dots" onclick="toggleMenu2('${file.FileUID}','${fileItem.SiteID}','${file.ID}' , '${fileItem.FileMasterList}')  ">
                <span>...</span>
            </div>
          `;
      
          const menu = document.createElement("div");
          menu.id = `menu-${file.FileUID}`;
          menu.className = "popup-menu";
          // const showaudit = <FontAwesomeIcon style={{color: "black"}} icon={faListSquares}/>
          menu.innerHTML = `
           <ul>
            <li onclick="confirmUndo('${file.FileUID}','${file.SiteID}','${fileItem.FileMasterList}','${file.DocumentLibraryName}','${file.ID}','${file.CurrentFolderPath}','${file.FileName}')">
              <img src=${Undo} alt="undo"/>Undo
            </li>
          </ul>
          `;
          card.appendChild(menu);
          container.appendChild(card);
        }
       })

    }
  })


}
// window.undo=async(fileId:any,siteId:any,FileMasterList:any,documentLibraryName:any,ID:any,folderPath:any,fileName:any)=>{
//   console.log("Undo function called");
//   console.log("fileId",fileId);
//   console.log("siteId",siteId);
//   console.log("FileMasterList",FileMasterList);
//   console.log("documentLibraryName",documentLibraryName);
//   console.log("ID",ID);
//   console.log("folderPath",folderPath);
//   console.log("fileName",fileName);
  
//   try {
//     // update the corresponding IsDeleted Column of DMSEntityFileMaster to which file belong to.
//     const Id=Number(ID)
//     await sp.web.lists.getByTitle(FileMasterList).items.getById(Id).update({
//       IsDeleted:null,
//     });
//     console.log(`Item ID ${ID} updated successfully in list "${FileMasterList}".`);

//     // update the correponding IsDeleted Column of the document libray to which file belong to.
//     try {
//       const subsiteContext=await sp.site.openWebById(siteId);
//       const fileItem = await subsiteContext.web.getFileByServerRelativePath(`${folderPath}/${fileName}`).getItem();
//       let payload:any={
//         IsDeleted:null
//       }
//       const itemData = await fileItem.update(payload)
//       console.log("column updated successfully",itemData);
//       await Recyclebin(null,siteId);
//     } catch (error) {
//       console.log(`Error in updating the columns of document library ${documentLibraryName}`,error);
//     }
    
//   } catch (error) {
//     console.log(`Error in Updating the Columns of ${FileMasterList}`,error);
//   }

// }
window.undo=async(fileId:any,siteId:any,FileMasterList:any,documentLibraryName:any,ID:any,folderPath:any,fileName:any)=>{
  console.log("Undo function called");
  console.log("fileId",fileId);
  console.log("siteId",siteId);
  console.log("FileMasterList",FileMasterList);
  console.log("documentLibraryName",documentLibraryName);
  console.log("ID",ID);
  console.log("folderPath",folderPath);
  console.log("fileName",fileName);
  
  try {
    // update the corresponding IsDeleted Column of DMSEntityFileMaster to which file belong to.
    // const Id=Number(ID)
    // await sp.web.lists.getByTitle(FileMasterList).items.getById(Id).update({
    //   IsDeleted:null,
    // });
    // console.log(`Item ID ${ID} updated successfully in list "${FileMasterList}".`);
    const currentFile=await sp.web.lists
      .getByTitle(FileMasterList).items.filter(`FileUID eq '${fileId}'`)();

    currentFile.forEach(async(file)=>{
      await sp.web.lists.getByTitle(FileMasterList).items.getById(file.Id).update({
          IsDeleted:null  
        });
      })

    // update the correponding IsDeleted Column of the document libray to which file belong to.
    try {
      const subsiteContext=await sp.site.openWebById(siteId);
      const fileItem = await subsiteContext.web.getFileByServerRelativePath(`${folderPath}/${fileName}`).getItem();
      let payload:any={
        IsDeleted:null
      }
      const itemData = await fileItem.update(payload)
      console.log("column updated successfully",itemData);
      await Recyclebin(null,siteId);
    } catch (error) {
      console.log(`Error in updating the columns of document library ${documentLibraryName}`,error);
    }
    
  } catch (error) {
    console.log(`Error in Updating the Columns of ${FileMasterList}`,error);
  }

}
window.confirmUndo=(fileId:any, siteId:any, FileMasterList:any, documentLibraryName:any, ID:any,folderPath:any,fileName:any) =>{
  // Create a container for the popup
  const popupContainer = document.createElement("div");
  popupContainer.id = "dynamicPopup";
  popupContainer.style.position = "fixed";
  popupContainer.style.top = "0";
  popupContainer.style.left = "0";
  popupContainer.style.width = "100%";
  popupContainer.style.height = "100%";
  popupContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  popupContainer.style.display = "flex";
  popupContainer.style.justifyContent = "center";
  popupContainer.style.alignItems = "center";
  popupContainer.style.zIndex = "1000"; 

  // Create popup content
  const popupContent = document.createElement("div");
  popupContent.style.backgroundColor = "white";
  popupContent.style.padding = "20px";
  popupContent.style.borderRadius = "8px";
  popupContent.style.textAlign = "center";
  popupContent.style.width = "300px";

  // Add message text to the popup
  const message = document.createElement("p");
  message.textContent = "Are you sure you want to undo?";
  popupContent.appendChild(message);

  // Create Yes button
  const yesButton = document.createElement("button");
  yesButton.textContent = "Yes";
  yesButton.style.marginRight = "10px";
  yesButton.onclick = function () {
    window.undo(fileId, siteId, FileMasterList, documentLibraryName, ID,folderPath,fileName);
    closePopup(); // Close the popup after confirming
  };
  popupContent.appendChild(yesButton);

  // Create No button
  const noButton = document.createElement("button");
  noButton.textContent = "No";
  noButton.onclick = closePopup; // Just close the popup if canceled
  popupContent.appendChild(noButton);

  // Append popup content to popup container
  popupContainer.appendChild(popupContent);

  // Append the popup container to the document body
  document.body.appendChild(popupContainer);

  // Function to remove the popup from the DOM
  function closePopup() {
    document.body.removeChild(popupContainer);
  }
}
// This function is called when we click on the share.
// window.shareFile=async(fileID:String,siteId:String,currentFolderPathForFile:string,fileName:string)=>{
//   console.log("Share File called");
//   console.log("file Id",fileID);
//   console.log("site Id",siteId);
//   console.log("currentFolderPath",currentFolderPathForFile);

//   // exreact the Entity from folder path
//   const parts = currentFolderPathForFile.split("/");
//   const entity = parts[3];
//   console.log(entity);

//   const fetchUser=async(entity:any)=>{
//     const [
//       users,
//       users1,
//       users2,
//       users3,
//       users4,
//     ] = await Promise.all([
//       sp.web.siteGroups.getByName(`${entity}_Read`).users(),
//       sp.web.siteGroups.getByName(`${entity}_Initiator`).users(),
//       sp.web.siteGroups.getByName(`${entity}_Contribute`).users(),
//       sp.web.siteGroups.getByName(`${entity}_Admin`).users(),
//       sp.web.siteGroups.getByName(`${entity}_View`).users(),
//     ]);
//     console.log(users, "users ", users1,users2,users3,users4);
//     const combineArray = [
//       ...(users || []),
//       ...(users1 || []),
//       ...(users2 || []),
//       ...(users3 || []),
//       ...(users4 || []),
//     ];
     
//     const resultArray=combineArray.map((user) => (
//       {
//         id:String(user.Id),
//         value: user.Title,
//         email: user.Email
//       }
//     ))
//     console.log("combineArray", combineArray);
//     console.log("resultArray",resultArray)

//     return resultArray;
//   }

//   const users=await fetchUser(entity);
//   console.log("UserArray",users);
 

// // Check if a popup already exists, if so, remove it before creating a new one
// const existingPopup = document.getElementById('share-popup');
// if (existingPopup) {
// existingPopup.remove();
// }

// // Dummy data
// // const users = [
// //   { value: 'Test1', id: '14',email:"User1@officeindia.onmicrosoft.com" },
// //   { value: 'Test2', id: '31',email:"User2@officeindia.onmicrosoft.com" },
// //   { value: 'Test3', id: '137',email:"User3@officeindia.onmicrosoft.com"},
// //   { value: 'Test4', id: '33',email:"User4@officeindia.onmicrosoft.com" },
// //   { value: 'Test5', id: '32',email:"User5@officeindia.onmicrosoft.com" },
// //   { value: 'Test6', id: '34',email:"User6@officeindia.onmicrosoft.com" },
// //   { value: 'Test User1', id: '39',email:"User7@officeindia.onmicrosoft.com" },
// //   ];


// // Declare selectedUsers with an explicit type, assuming user IDs are of type string for selecting the user for share
// let selectedUsers: { id: string; value: string; email:string }[] = [];
// // Create the pop-up element
// const popup = document.createElement("div");
// popup.id = 'share-popup';
// popup.className = "share-popup";

// // Add HTML structure for the pop-up with a dropdown and a close "X" button
// popup.innerHTML = `
// <div class="share-popup-content">
// <div class="share-popup-header">
//   <h4>Share</h4>
//   <span class="share-close-popup" onClick="hideSharePopUp()">x</span>
// </div>
// <div class="share-popup-body">
//   <div id="share-reactSelect">
//       <input type="text" id="userInput" placeholder="Add a Name, Group, or Email" style="
//       width: 100%;
//       padding: 10px;
//       font-size: 14px;
//       border-radius: 4px;
//       border: 1px solid #ccc;
//     "/>
//     <div id="userDropdown" class="user-dropdown" style="
//       display: none;
//       position: absolute;
//       width: 29.8%;
//       max-height: 150px;
//       overflow-y: auto;
//       background-color: white;
//       border: 1px solid #ccc;
//       border-radius: 4px;
//       z-index: 1000;
//     ">
//     </div>
//   </div>
//   <textarea id="share-message" placeholder="Write a message..." >
//   </textarea>
// </div>
// <div class="share-popup-footer">
//   <button id="share-shareFileButton">Share</button>
// </div>
// </div>
// `;

// // Append the  popup to the body
// document.body.appendChild(popup);

// // Get references to the input box and dropdown
// const userInput = document.getElementById('userInput') as HTMLInputElement;
// const userDropdown = document.getElementById('userDropdown');

// // Function to render dropdown options based on user input
// function renderDropdown(users: { id: string, value: string,email:string }[]) {
// // Clear previous options
// userDropdown.innerHTML = '';
// users.forEach(user => {
// const option = document.createElement('div');
// option.className = 'dropdown-item';
// option.style.padding = '8px';
// option.style.cursor = 'pointer';
// option.textContent = user.value;
// option.onclick = () => selectUser(user);
// userDropdown.appendChild(option);
// });
// }

// // Function to show the dropdown when the input is clicked
// userInput.addEventListener('focus', () => {
// userDropdown.style.display = 'block';

// // Display all users initially
// renderDropdown(users);
// });

// // Filter dropdown based on input value
// userInput.addEventListener('input', () => {
// const searchValue = userInput.value.toLowerCase();
// const filteredUsers:any = users.filter(user => user.value.toLowerCase().includes(searchValue));
// renderDropdown(filteredUsers);
// });

// // Function to select a user and display it inside the input
// function selectUser(user: { id: string, value: string,email:string }) {
// console.log("selected user",selectedUsers)
// if (!selectedUsers.some(selectedUser => selectedUser.id === user.id)) {

// selectedUsers.push(user);

// // Create a span for the selected user with a close button
// const selectedUserDiv = document.createElement('span');
// selectedUserDiv.className = 'selected-user';
// selectedUserDiv.style.display = 'inline-block';
// selectedUserDiv.style.padding = '2px 6px';
// selectedUserDiv.style.backgroundColor = '#e0e0e0';
// selectedUserDiv.style.borderRadius = '12px';
// selectedUserDiv.style.marginRight = '5px';
// selectedUserDiv.style.position = 'relative';

// selectedUserDiv.textContent = user.value;

// // Create close button for deselecting the user
// const closeButton = document.createElement('span');
// closeButton.textContent = 'x';
// closeButton.style.cursor = 'pointer';
// closeButton.style.marginLeft = '5px';
// closeButton.onclick = () => deselectUser(user.id, selectedUserDiv);
// selectedUserDiv.appendChild(closeButton);

// // Append the selected user to the input field
// userInput.parentNode!.insertBefore(selectedUserDiv, userInput);
// userInput.value = '';
// }
// userDropdown.style.display = 'none';
// }

// // Function to deselect a user
// function deselectUser(userId: string, selectedUserDiv: HTMLElement) {
// // selectedUsers = selectedUsers.filter(id => id !== userId);
// selectedUsers = selectedUsers.filter(selectedUser => selectedUser.id !== userId);
// console.log("selected user",selectedUsers);
// selectedUserDiv.remove();
// }

// // Hide the dropdown if clicked outside
// document.addEventListener('click', (event) => {
// if (!userInput.contains(event.target as Node) && !userDropdown.contains(event.target as Node)) {
// userDropdown.style.display = 'none';
// }
// });

// // Adding event listener to the "Share" button
// document.getElementById('share-shareFileButton').addEventListener('click', async function() {
//     console.log("selectedUserArray",selectedUsers);
//     console.log("Entity",entity);
//     console.log("FileId",fileID)
//     console.log("SiteId",siteId);

//     const listToUpdateWithShareData=`DMS${entity}FileMaster`;
//     console.log("listToUpdateWithShareData",listToUpdateWithShareData);

//     // Fetch the item from the list using its ID
//     const item = await sp.web.lists.getByTitle(listToUpdateWithShareData).items.select("FileName","ShareWithOthers","ShareWithMe","FileUID","ID").filter(`FileUID eq '${fileID}' and CurrentUser eq '${currentUserEmailRef.current}'`)();

//     console.log("item",item);

//     // let dataArray;
//     let dataArray: Array<{ FirstName: string; LastName?: string; SharedWith: string; SharedAt: string; TimeStamp: number; Permission: string,userId:string }> = [];
         
//     selectedUsers.forEach(async(user)=>{
   
//     const nameParts = user.value.trim().split(" ");
//     const firstName = nameParts[0];
//     let lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
//     console.log("firstName",firstName)
//     console.log("lastName",lastName);
//     if(lastName === ""){
//       lastName="";
//     }

//     const isoDate = new Date().toISOString().slice(0, 19) + 'Z';
//     const timestamp = Date.now();
//       let userObj={
//         FirstName:firstName,
//         LastName:lastName,
//         SharedWith:user.email,
//         SharedAt:isoDate,
//         TimeStamp:timestamp,
//         Permission:"Read",
//         userId:user.id
//       }
//       dataArray.push(userObj);
//       // console.log("userObj",userObj);
//     })

//     console.log("dataArray",dataArray);

   

//     if(item[0].ShareWithMe === null && item[0].ShareWithOthers === null){

//           const dataInTheFormoOfString=JSON.stringify(dataArray);
//            // Now update specific columns of the item
//             const updatedItem = await sp.web.lists.getByTitle(listToUpdateWithShareData).items.getById(item[0].ID).update({
//               ShareWithOthers:dataInTheFormoOfString,
//               ShareWithMe:dataInTheFormoOfString
//             });

//             console.log("Data updated when ShareWithMe and ShareWithOthers are null",updatedItem);
//     }else{
//        const shareWithOthers =JSON.parse(item[0].ShareWithOthers);
//        const shareWithMe=JSON.parse(item[0].ShareWithMe);

//        dataArray.forEach((user)=>{
//             // apply condition for sharing same file with same user multiple time using id of the user
//             const alReadySharedUserIndex=shareWithOthers.findIndex((item:any)=>{
//                   return item.userId === user.userId
//             })
//             console.log("alReadySharedUser in shareWithOthers",alReadySharedUserIndex);
//             const alReadySharedUserIndex1=shareWithMe.findIndex((item:any)=>{
//                 return item.userId === user.userId
//             })
//             console.log("alReadySharedUser in shareWithMe",alReadySharedUserIndex1);

//             if(alReadySharedUserIndex !== -1){
//                   shareWithOthers.splice(alReadySharedUserIndex, 1);
//                   shareWithOthers.push(user);
//                   console.log("shareWithOthers",shareWithOthers);
//             }else{
//               shareWithOthers.push(user);
//             }

//             if(alReadySharedUserIndex1 !== -1){
//               shareWithMe.splice(alReadySharedUserIndex1, 1);
//               shareWithMe.push(user);
//               console.log("shareWithMe",shareWithMe);
//             }else{
//               shareWithMe.push(user);
//             }
//        })

//        console.log("shareWithOthers",shareWithOthers);
//        console.log("shareWithMe",shareWithMe);

//        const dataInTheFormoOfStringForShareWithMe=JSON.stringify(shareWithMe);
//        const dataInTheFormoOfStringForShareWithOthers=JSON.stringify(shareWithOthers);
//        // Now update specific columns of the item
//        const updatedItem = await sp.web.lists.getByTitle(listToUpdateWithShareData).items.getById(item[0].ID).update({
//         ShareWithOthers:dataInTheFormoOfStringForShareWithOthers,
//         ShareWithMe:dataInTheFormoOfStringForShareWithMe
//       });

//       console.log("Data updated when ShareWithMe and ShareWithOthers",updatedItem);
//     }

// });


// }
window.shareFile=async(fileID:string,siteId:string,currentFolderPathForFile:string,fileName:string,flag:string,FileVersion:any,FileSize:any,Status:any,FilePreviewURL:any,DocumentLibraryName:any)=>{
  console.log("Share File called");
  console.log("flag",flag);
  console.log("file Id",fileID);
  console.log("site Id",siteId);
  console.log("FileName",fileName);
  console.log("currentFolderPath",currentFolderPathForFile);

  // Check permission of file when it come from the myrequest start
  const testidsub =await sp.site.openWebById(siteId)  
  
  let filePath=`${currentFolderPathForFile}/${fileName}`;
  console.log("filePath",filePath);
  const fileServerRelativePath = testidsub.web.getFileByServerRelativePath(filePath);
  // Retrieve the list item associated with the file
  const item = await fileServerRelativePath.getItem();
  console.log("items",item);
  // Get current user permissions on the item (file)
  const filePermissions = await item.getCurrentUserEffectivePermissions(); 
  console.log("File permissions:", filePermissions);
  // console.log("file listItems All field",file.ListItemAllFields);

  const hasFullControl = testidsub.web.hasPermissions(filePermissions, PermissionKind.ManageWeb);
  const hasEdit = testidsub.web.hasPermissions(filePermissions, PermissionKind.EditListItems);
  const hasContribute = testidsub.web.hasPermissions(filePermissions, PermissionKind.AddListItems) && testidsub.web.hasPermissions(filePermissions, PermissionKind.EditListItems);
  const hasRead = testidsub.web.hasPermissions(filePermissions, PermissionKind.ViewListItems);
  console.log(hasFullControl , "hasFullControl")
  console.log(hasEdit , "hasEdit")
  console.log(hasContribute , "hasContribute")
  console.log(hasRead , "hasRead")
  let filePermission:string;
  if (hasFullControl) {
    filePermission ="Full Control";
  } else if (hasEdit) {
    filePermission ="Edit";
  } else if (hasContribute) {
    filePermission = "Contribute";
  } else if (hasRead) {
    filePermission = "Read";
  } else {
    filePermission = "No Access";
  }

  console.log("filePermission",filePermission);

  // exreact the Entity from folder path
  const parts = currentFolderPathForFile.split("/");  
  const entity = parts[3]; 
  console.log(entity); 

  const fetchUser=async(entity:any)=>{
    // const [
    //   users,
    //   users1,
    //   users2,
    //   users3,
    //   users4,
    // ] = await Promise.all([
    //   sp.web.siteGroups.getByName(`${entity}_Read`).users(),
    //   sp.web.siteGroups.getByName(`${entity}_Initiator`).users(),
    //   sp.web.siteGroups.getByName(`${entity}_Contribute`).users(),
    //   sp.web.siteGroups.getByName(`${entity}_Admin`).users(),
    //   sp.web.siteGroups.getByName(`${entity}_View`).users(),
    // ]);
    // console.log(users, "users ", users1,users2,users3,users4);
    // const combineArray = [
    //   ...(users || []),
    //   ...(users1 || []),
    //   ...(users2 || []),
    //   ...(users3 || []),
    //   ...(users4 || []),
    // ];

    // const siteContext = await sp.site.openWebById(OthProps.siteID);
    const user0 = await sp.web.siteUsers();
    const combineUsersArray=user0.map((user)=>(
          {
            id:String(user.Id),
            value: user.Title,
            email: user.Email,
          }
    ))
    console.log("Sub site users",combineUsersArray);
      
    // const resultArray=combineUsersArray.map((user) => ( 
    //   {
    //     id:String(user.Id),
    //     value: user.Title,
    //     email: user.Email
    //   }
    // ))
    // console.log("combineArray", combineArray);
    // console.log("resultArray",resultArray)

    return combineUsersArray;
  }

  const users=await fetchUser(entity);
  console.log("UserArray",users);
 

// Check if a popup already exists, if so, remove it before creating a new one
const existingPopup = document.getElementById('share-popup');
if (existingPopup) {
existingPopup.remove();
}

// Dummy data
// const users = [
//   { value: 'Test1', id: '14',email:"User1@officeindia.onmicrosoft.com" },
//   { value: 'Test2', id: '31',email:"User2@officeindia.onmicrosoft.com" },
//   { value: 'Test3', id: '137',email:"User3@officeindia.onmicrosoft.com"},
//   { value: 'Test4', id: '33',email:"User4@officeindia.onmicrosoft.com" },
//   { value: 'Test5', id: '32',email:"User5@officeindia.onmicrosoft.com" },
//   { value: 'Test6', id: '34',email:"User6@officeindia.onmicrosoft.com" },
//   { value: 'Test User1', id: '39',email:"User7@officeindia.onmicrosoft.com" },
//   ];


// Declare selectedUsers with an explicit type, assuming user IDs are of type string for selecting the user for share
let selectedUsers: { id: string; value: string; email:string }[] = [];
// Create the pop-up element
const popup = document.createElement("div");
popup.id = 'share-popup';
popup.className = "share-popup";

// Show permissions options.
let options=''
if(filePermission === "Full Control"){
options=`
    <option value="Full Control">Full Control</option>
    <option value="Contribute">Contribute</option>
    <option value="Edit">Edit</option>
    <option value="Read">Read</option>
`
}else if(filePermission === "Contribute" || filePermission === "Edit"){
options=`
  <option value="Contribute">Contribute</option>
  <option value="Edit">Edit</option>
  <option value="Read">Read</option>
`
}else if(filePermission === "Read"){
options=`
  <option value="Read">Read</option>
` 
}


// Add HTML structure for the pop-up with a dropdown and a close "X" button
popup.innerHTML = `
<div class="share-popup-content">
<div class="share-popup-header">
  <h4>Share</h4>
  <span class="share-close-popup" onClick="hideSharePopUp()">x</span>
</div>
<div class="share-popup-body">
  <div id="share-reactSelect">
      <input type="text" id="userInput" placeholder="Add a Name, Group, or Email" style="
      width: 100%; 
      padding: 10px;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #ccc;
    "/>
    <div id="userDropdown" class="user-dropdown" style="
      display: none;
      position: absolute;
      width: 29.8%;
      max-height: 150px;
      overflow-y: auto;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      z-index: 1000;
    ">
    </div>
  </div>
   <div>
    <select id="permissionSelect" style="
      margin-bottom:10px;
      width: 100%; 
      padding: 10px;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #ccc;
      margin-top: 10px;
    ">
      <option value="" disabled selected>Permission</option>
      ${options}
    </select>
  </div>
  <textarea id="share-message" placeholder="Write a message..." >
  </textarea>
</div>
<div class="share-popup-footer">
  <button id="share-shareFileButton">Share</button>
</div>
</div>
`;

// Append the  popup to the body
document.body.appendChild(popup);

// Get references to the input box and dropdown
const userInput = document.getElementById('userInput') as HTMLInputElement;
const userDropdown = document.getElementById('userDropdown');

// Function to render dropdown options based on user input
function renderDropdown(users: { id: string, value: string,email:string }[]) {
// Clear previous options
userDropdown.innerHTML = ''; 
users.forEach(user => {
const option = document.createElement('div');
option.className = 'dropdown-item';
option.style.padding = '8px';
option.style.cursor = 'pointer';
option.textContent = user.value;
option.onclick = () => selectUser(user);
userDropdown.appendChild(option);
});
}

// Function to show the dropdown when the input is clicked
userInput.addEventListener('focus', () => {
userDropdown.style.display = 'block';

// Display all users initially
renderDropdown(users); 
});

// Filter dropdown based on input value
userInput.addEventListener('input', () => {
const searchValue = userInput.value.toLowerCase();
const filteredUsers= users.filter(user => user.value.toLowerCase().includes(searchValue));
renderDropdown(filteredUsers);
});

// Function to select a user and display it inside the input
function selectUser(user: { id: string, value: string,email:string }) {
console.log("selected user",selectedUsers)
if (!selectedUsers.some(selectedUser => selectedUser.id === user.id)) {

selectedUsers.push(user);

// Create a span for the selected user with a close button
const selectedUserDiv = document.createElement('span');
selectedUserDiv.className = 'selected-user';
selectedUserDiv.style.display = 'inline-block';
selectedUserDiv.style.padding = '2px 6px';
selectedUserDiv.style.backgroundColor = '#e0e0e0';
selectedUserDiv.style.borderRadius = '12px';
selectedUserDiv.style.marginRight = '5px';
selectedUserDiv.style.position = 'relative';

selectedUserDiv.textContent = user.value;

// Create close button for deselecting the user
const closeButton = document.createElement('span');
closeButton.textContent = 'x';
closeButton.style.cursor = 'pointer';
closeButton.style.marginLeft = '5px';
closeButton.onclick = () => deselectUser(user.id, selectedUserDiv);
selectedUserDiv.appendChild(closeButton);

// Append the selected user to the input field
userInput.parentNode!.insertBefore(selectedUserDiv, userInput);
userInput.value = ''; 
}
userDropdown.style.display = 'none'; 
}

// Function to deselect a user
function deselectUser(userId: string, selectedUserDiv: HTMLElement) {
// selectedUsers = selectedUsers.filter(id => id !== userId);
selectedUsers = selectedUsers.filter(selectedUser => selectedUser.id !== userId);
console.log("selected user",selectedUsers);
selectedUserDiv.remove();
}

// Hide the dropdown if clicked outside
document.addEventListener('click', (event) => {
if (!userInput.contains(event.target as Node) && !userDropdown.contains(event.target as Node)) {
userDropdown.style.display = 'none';
}
});

// Capture selected permission
let selectedPermission = "";
document.getElementById('permissionSelect').addEventListener('change', (event) => {
selectedPermission = (event.target as HTMLSelectElement).value;
console.log("Selected Permission:", selectedPermission);
});

// Adding event listener to the "Share" button
document.getElementById('share-shareFileButton').addEventListener('click', async function() {
    console.log("selectedUserArray",selectedUsers);
    console.log("Entity",entity);
    console.log("FileId",fileID);
    console.log("SiteId",siteId);
    console.log("currentFolderPathForFile",currentFolderPathForFile);
    console.log("FileName",fileName);
    console.log("filesize",FileSize);
    console.log("FileVersion",FileVersion);
    console.log("Status",Status);
    console.log("FilePreviewURL",FilePreviewURL);
    console.log("DocumentLibraryName",DocumentLibraryName)

    // New Code push the data into the DMSShareWithOtherMaster Start
    try {
      const isoDate = new Date().toISOString().slice(0, 19) + 'Z';
      const payloadForDMSShareWithOtherMaster={
        FileName:fileName,
        FileUID:fileID,
        CurrentUser:currentUserEmailRef.current,
        CurrentFolderPath:currentFolderPathForFile,
        SiteName:entity,
        PermissionType:selectedPermission,
        ShareAt:isoDate,
        FileVersion:FileVersion,
        FileSize:FileSize,
        Status:Status,
        FilePreviewURL:FilePreviewURL,
        SiteID:siteId,
        DocumentLibraryName:DocumentLibraryName
      }
      selectedUsers.forEach(async(user)=>{
            (payloadForDMSShareWithOtherMaster as any).UserID=user.id;
            (payloadForDMSShareWithOtherMaster as any).ShareWithOthers=user.value;
            (payloadForDMSShareWithOtherMaster as any).ShareWithMe=user.email;
            const newItem = await sp.web.lists.getByTitle(`DMSShareWithOtherMaster`).items.add(payloadForDMSShareWithOtherMaster)
            console.log("Data added successfully in the",newItem);
      })
     
    } catch (error) {
      console.log("Error in adding data to the DMSShareWithOtherMaster",error);
    }
  

});


}
// hide the share popup
// @ts-ignore
window.hideSharePopUp=()=>{
const popup=document.querySelector('.share-popup');

if(popup){
  popup.remove();
}
}


// Sharewith Me And Share With Others
  //Toggle the menu card
  // @ts-ignore
   window.toggleMenu2 = async function(fileId: any , siteID:any , listitemid:any , Listname:any) {
    
    // const fileItem = sp.web.getFileByServerRelativePath();
    // const testidsub = await sp.site.openWebById(siteID);
    // const file = testidsub.web.getFileByServerRelativePath('/sites/AlRostmani/t222/T222D3/Coordinator666.doc');
    // const testidsub = await sp.site.openWebById(siteID);
    // const filepath1 = '/sites/AlRostmani/t222/T222D3/T222D3F1/FINAL TESTC2 (3).docx'
    // const filepath2 = '/sites/AlRostmani/t222/T222D3/Coordinator666.doc'
    // const file = testidsub.web.getFileByServerRelativePath(filepath2);
    
    // // Retrieve the list item associated with the file
    // const item = await file.getItem();
    
    // // Get current user permissions on the item (file)
    // const filePermissions = await item.getCurrentUserEffectivePermissions();
    
    // console.log("File permissions:", filePermissions);

    // const hasFullControl = sp.web.hasPermissions(filePermissions, PermissionKind.FullMask);
    // const hasEdit = sp.web.hasPermissions(filePermissions, PermissionKind.EditListItems);
    // const hasContribute = sp.web.hasPermissions(filePermissions, PermissionKind.AddListItems) && sp.web.hasPermissions(filePermissions, PermissionKind.EditListItems);
    // const hasRead = sp.web.hasPermissions(filePermissions, PermissionKind.ViewListItems);
    // console.log(hasFullControl , "hasFullControl")
    // console.log(hasEdit , "hasEdit")
    // console.log(hasContribute , "hasContribute")
    // console.log(hasRead , "hasRead")
    // if (hasFullControl) {
    //     return "Full Control";
    // } else if (hasEdit) {
    //     return "Edit";
    // } else if (hasContribute) {
    //     return "Contribute";
    // } else if (hasRead) {
    //     return "Read";
    // } else {
    //     return "No Access";
    // }
//     console.log(fileId , "fileId")
//     console.log(doclibname , "listitemid")
//     console.log(folderpath , "folderpath")
    
//      const testidsub = await sp.site.openWebById(siteID);

//     const musa =  testidsub.web
//               .getFolderByServerRelativePath(folderpath)
//               .files.select("Name", "Length", "ServerRelativeUrl", "UniqueId","MajorVersion" , "ListItemAllFields/Status","ListItemAllFields/IsDeleted" ,"ListItemAllFields/Id").expand("ListItemAllFields")()

//  console.log(musa , "musa")
//     //  const itemsInLibrary = await testidsub.web.lists.getByTitle(doclibname)
//     //  .items
//     //  .select("UniqueId", "Id", "ListItemAllFields") // Add the ListItemAllFields to select
//     //  .expand("ListItemAllFields")(); // Execute the query
//     //  console.log("Items in library:", itemsInLibrary);
//      // Retrieve the file item using its UID
//      const fileItem = await testidsub.web.lists.getByTitle(doclibname)
//      .items.filter(`ID eq 4`)(); // Do not expand ListItemAllFields

//       console.log(fileItem , fileItem , "fileItem")
//      if (!fileItem || fileItem.length === 0) {
//          console.log(`Item with UID ${fileId} not found in the library ${doclibname}.`);
//          return;
//      }

//      // Get the ListItemAllFields
//      const listItem = fileItem[0].ListItemAllFields;
//  console.log(fileItem , "fileItem")
//      // Check current user's effective permissions on the item
//      const permissions = await listItem.getCurrentUserEffectivePermissions();
//      console.log("User Permissions:", permissions);

//      // Interpret permissions (example)
//      const hasRead = permissions.has("Read");
//      const hasEdit = permissions.has("Edit");
//      const hasDelete = permissions.has("Delete");

//      console.log(`Current user has Read permission: ${hasRead}`);
//      console.log(`Current user has Edit permission: ${hasEdit}`);
//      console.log(`Current user has Delete permission: ${hasDelete}`);

// Check if the item has unique permissions
// const hasUniqueRoleAssignments = await fileItem.hasUniqueRoleAssignments();

// if (hasUniqueRoleAssignments) {
//     console.log(`Item with ID ${4} has unique permissions.`);

//     // Get the role assignments for the item
//     const roleAssignments = await fileItem.roleAssignments.expand("Member", "RoleDefinitionBindings")();

//     // Replace with the current user's email
//     const currentUserEmail = "user@example.com"; // Get this dynamically based on your context
//     let userPermissions = null;

//     roleAssignments.forEach((roleAssignment:any) => {
//         if (roleAssignment.Member.Email === currentUserEmailRef.current) {
//             userPermissions = roleAssignment.RoleDefinitionBindings.map((role:any) => role.Name);
//         }
//     });

//     if (userPermissions) {
//         console.log(`User ${currentUserEmailRef.current} has the following permissions on item ID ${4}:`, userPermissions);
//     } else {
//         console.log(`User ${currentUserEmailRef.current} does not have custom permissions on item ID ${4}.`);
//     }
// } else {
//     console.log(`Item with ID ${4} inherits permissions from its parent.`);
// }
    const myfunction = async () => {
      const subsiteContext = await sp.site.openWebById(siteID);
  
      // Fetch all the groups in the subsite
      interface IMember {
        PrincipalType: number;
        Title: string;
        Id: number;
      }
  
      interface IRoleAssignmentInfo {
        Member?: IMember;
      }
  
      const groups3: IRoleAssignmentInfo[] = await subsiteContext.web.roleAssignments.expand("Member")();
      console.log("groups3", groups3);
  
      // Filter the groups for current user roles (_View, _Read, _Contribute, _Admin, etc.)
      const filteredMembers = groups3.filter((roleAssignment) => {
        return roleAssignment.Member.PrincipalType === 8; // Group PrincipalType
      });
  
      const filteredGroups = filteredMembers.map((object) => ({
        value: object.Member.Title,
        label: object.Member.Title,
        Id: object.Member.Id,
      }));
      console.log("filteredGroups", filteredGroups);
      mydatacard = "12"
      // Check if current user is in the _Admin or _Contribute group
      const isAdmin = filteredGroups.some((group) => group.value.includes("_Admin"));
      const isContribute = filteredGroups.some((group) => group.value.includes("_Contribute"));
      if(isAdmin){
        isadmin = "Admin"
        console.log("User is Admin")
      }
      if(isContribute){
        isadmin = "Contribute"
        console.log("User is Contribute")
      }
    }
    myfunction()

    console.log("Inside the toggleMenu2");
    console.log(siteID, "siteID")
    console.log(fileId , "fileId")
    console.log("enter here i n menu card")
    const allMenus = document.querySelectorAll('.popup-menu');
    console.log(allMenus , "allMenus")
    allMenus.forEach(menu => {
      console.log(menu , "menu")
      console.log(menu.id , "menu.id")
      console.log(fileId , "fileId")
      if (menu.id !== `menu-${fileId}`) {
        menu.classList.remove("show");
      }
    });
  
    // Toggle the menu for the clicked card
    const menu = document.getElementById(`menu-${fileId}`);
    if (menu) {
      console.log("Toggle the menu for the clicked card")
      menu.classList.toggle("show");
    }
    document.addEventListener('click', (event) => {
    
      // console.log("Outside click Event Called");
    
      const target = event.target as HTMLElement;
    
      // Check if the click was inside any menu or three-dot icon
      const isClickInsideMenu = target.closest('.popup-menu');
      const isClickInsideThreeDots = target.closest('.three-dots');
    
      // console.log("This is nested folder",isClickInsideThreeDots);
    
      if (!isClickInsideMenu && !isClickInsideThreeDots) {
        const allMenus = document.querySelectorAll('.popup-menu');
        allMenus.forEach(menu => {
          menu.classList.remove('show');
        });
      }
    });
  }
  
  
    // Edit file action
     // @ts-ignore

    
  
    // Delete file action
   // @ts-ignore
  
   /// this is pop up function
   window.confirmDeleteFile =async(fileId:string, siteID:string ,IsHardDelete:any,ListToUpdate:any=null)=>{
    console.log("list name is " , ListToUpdate)
    // console.log(listToUpdate , "listAnme")
    event.preventDefault();
    event.stopPropagation();

    console.log("Inside The confirmDeleteFile");
    console.log("Is Hard Delete ",IsHardDelete);
    console.log("FileID",fileId);
    console.log("siteId",siteID);
   
    const popupData = await sp.web.lists.getByTitle('DMSPopupMaster').items
    .select('PopupText', 'Typeofpopup', 'Isrequires')();
   
    console.log("popupitems",popupData);
   
   popupData.forEach(async (popItems) => {
   
      // Check the type of popup and if it is required
      switch (popItems.Typeofpopup) {
      
          case 'Delete':
              if (popItems.Isrequires) {
                console.log(popItems.Typeofpopup ,"popItems.Typeofpopup ")
                      console.log("TypeOfPopUp: Delete and Isrequires is true");
                     
                      // Create Pop
                      const deleteConfirmationPop = document.createElement('div');
                      deleteConfirmationPop.className = "popup-modal";
                      deleteConfirmationPop.innerHTML = `
                          <div class="popup-content">
                            <p id="confirmation-text">${popItems.PopupText}</p>
                            <div class="popup-actions">
                                <button id="confirm-yes">Yes</button>
                                <button id="confirm-no">No</button>
                            </div>
                          </div>
                      `;
   
                      document.body.appendChild(deleteConfirmationPop);
   
                      // Handle Yes button click (confirmation for Delete)
                      const yesButton =document.getElementById('confirm-yes');
                      yesButton.addEventListener('click', async () => {
                      const confirmationText = document.getElementById('confirmation-text');
                      confirmationText.innerHTML = 'Loading...';
                      
                      try {
                            console.log("Calling deleteFile from confirm delete");
                            await window.deleteFile(fileId, siteID,IsHardDelete,ListToUpdate);

                            // console.log("Updating List inside the confirem Delete");
                            // if(ListToUpdate){       
                            //         const items999 = await sp.web.lists
                            //         .getByTitle(ListToUpdate).items.filter(`FileUID eq '${fileId}'`).top(1)();
                            //         alert(items999)
                                    
                            //         if (items999.length > 0) {
                            //         const itemId = items999[0].ID;
                            //         console.log(itemId , "itemId")
                            //         console.log(items999 , "item9999")
                            //         // Delete the item by ID
                            //         const mylist = ListToUpdate
                            //         console.log(mylist, "mylist")
                            //         await sp.web.lists.getByTitle(mylist).items.getById(itemId).delete();
                        
                            //         console.log(`Item with FileUid ${fileId} has been deleted.`);
                            //         }
                                   
                        // }
                        confirmationText.innerHTML = 'Your file was deleted successfully.';
                      
                        } catch (error) {
                          confirmationText.innerHTML = 'Something went wrong. Your file was not deleted.';
                      }
   
                      // Remove the popup after 1 second
                      setTimeout(() => document.body.removeChild(deleteConfirmationPop), 1000);
                  });
   
                      // Handle No button click (cancel deletion)
                      document.getElementById('confirm-no').addEventListener('click', () => {
                          document.body.removeChild(deleteConfirmationPop); // Close the popup
                      });
   
                  } else {
                      console.log("TypeOfPopUp: Delete and Isrequires is false");
                      // Directly delete the file if no popup is required
                      try {
                          await window.deleteFile(fileId, siteID,IsHardDelete,ListToUpdate);
                          alert('Your file was deleted successfully.');
                      } catch (error) {
                          alert('Error deleting file.');
                      }
                  }
                  break;
   
          case 'CreateFile':
                  if (popItems.Isrequires) {
                      console.log("TypeOfPopUp: CreateFile and Isrequires is true");
                     
                      // Show popup for CreateFile
                      const createFileConfirmationPop = document.createElement('div');
                      createFileConfirmationPop.className = "popup-modal";
                      createFileConfirmationPop.innerHTML = `
                          <div class="popup-content">
                            <p id="confirmation-text">${popItems.PopupText}</p>
                            <div class="popup-actions">
                                <button id="confirm-yes">Yes</button>
                                <button id="confirm-no">No</button>
                            </div>
                          </div>
                      `;
   
                      document.body.appendChild(createFileConfirmationPop);
                  } else {
                        // Logic without Pop
                    }
                    break;
   
          // Add more cases here for other types like 'Edit', 'Upload', etc.
          default:
              console.log("Unknown TypeOfpopup: ", popItems.Typeofpopup);
      }
  });
   
  }
  
  
  // Without Pop-up
  // @ts-ignore
  // window.deleteFile = async(fileId:string, siteID:string, IsHardDelete:any, ListToUpdate:any=null) => {
  //   console.log("Inside the deleteFile");
  //   console.log("ListToUpdate",ListToUpdate)
  //   console.log(siteID ,"siteID")
  //   console.log(`Delete file with ID: ${fileId}`);
  //   console.log("ISHard delete inside delete ",IsHardDelete);
  //   console.log("ISHard delete type of ",typeof(IsHardDelete));


  //   const {web} = await sp.site.openWebById(siteID)
  //   const file=await web.getFileById(fileId);
  //   const listItem = await file.getItem();

  //   const isoDate = new Date().toISOString().slice(0, 19) + 'Z';

    
    
  //   if(IsHardDelete === "true"){
  //     alert( `in true IsHardDelete is ${IsHardDelete}`)
  //     try {
  //       const deleteffile =  await web.getFileById(fileId).delete();
  //       console.log(deleteffile , "deleteffile");
  //     } catch (error) {
  //       console.log(error, "in true IsHardDelete is")
  //     }
      
  //   }else if(IsHardDelete === "false"){
  //     alert( `in false IsHardDelete is ${IsHardDelete}`)
  //     try {
  //       const updatedData =await listItem.update({
  //         IsDeleted:isoDate  
  //       });
  //       console.log("Updated data",updatedData);
  //     } catch (error) {
  //       console.log(error, "in  IsHardDelete is")
  //     }
      
  //   }
    
  //    alert(`File with ID: ${fileId} has been deleted successfully.`);
  //    console.log(currentfolderpath , "currentfolderpath")
  //    console.log("currentEntity",currentEntity);
     
  //    //start
  //    if(ListToUpdate || currentEntity){
  //         console.log("Inside The check Of Entity->",currentEntity,"->",ListToUpdate);
  //         let currentList;
  //         if(ListToUpdate){
  //             currentList=ListToUpdate;
  //         }
  //         if(currentEntity){
  //             currentList=`DMS${currentEntity}FileMaster`;
  //         }
  //         console.log("selected List",currentList);
  //         const items999 = await sp.web.lists
  //         .getByTitle(currentList).items.filter(`FileUID eq '${fileId}'`).top(1)();
  //                         alert(items999)
          
  //         if (items999.length > 0) {
  //         const itemId = items999[0].ID;

          
  //         if(IsHardDelete === "true"){
  //           alert( `in true IsHardDelete is ${IsHardDelete}`)
  //          try {
  //           await sp.web.lists.getByTitle(currentList).items.getById(itemId).delete();
  //           console.log(`Item with FileUid ${fileId} has been deleted.`);
  //          } catch (error) {
  //             console.log(error, "in true IsHardDelete is")
  //          }
             
  //         }else if(IsHardDelete === "false"){
  //           alert( `in flase IsHardDelete is ${IsHardDelete}`)

  //           try {
  //             await sp.web.lists.getByTitle(currentList).items.getById(itemId).update({
  //               IsDeleted:isoDate  
  //             });
  //             console.log(`Item with FileUid ${fileId} has been deleted.`);
  //      } catch (error) {
  //       console.log(error, "in false IsHardDelete is")
  //      }
           
  //         }
          

  //         // Delete the item by ID
  //         // await sp.web.lists.getByTitle(currentList).items.getById(itemId).delete();
  //         // console.log(`Item with FileUid ${fileId} has been deleted.`);
  //         }
  //     }
  //     // end
  //   console.log("currentfolderpath",currentfolderpath,"currentsiteID",currentsiteID,"currentDocumentLibrary",currentDocumentLibrary)
  //    getdoclibdata(currentfolderpath, currentsiteID , currentDocumentLibrary)
  //   //  getfolderdata(currentfolderpath,currentsiteID)
  // };
  window.deleteFile = async(fileId:string, siteID:string, IsHardDelete:any, ListToUpdate:any=null) => {
    console.log("Inside the deleteFile");
    console.log("ListToUpdate",ListToUpdate)
    console.log(siteID ,"siteID")
    console.log(`Delete file with ID: ${fileId}`);
    console.log("ISHard delete inside delete ",IsHardDelete);
    console.log("ISHard delete type of ",typeof(IsHardDelete));


    const {web} = await sp.site.openWebById(siteID)
    const file=await web.getFileById(fileId);
    const listItem = await file.getItem();

    const isoDate = new Date().toISOString().slice(0, 19) + 'Z';

    
    
    if(IsHardDelete === "true"){
      // alert( `in true IsHardDelete is ${IsHardDelete}`)
      try {
        const deleteffile =  await web.getFileById(fileId).delete();
        console.log(deleteffile , "deleteffile");
      } catch (error) {
        console.log(error, "in true IsHardDelete is")
      }
      
    }else if(IsHardDelete === "false"){
      // alert( `in false IsHardDelete is ${IsHardDelete}`)
      try {
        const updatedData =await listItem.update({
          IsDeleted:isoDate  
        });
        console.log("Updated data",updatedData);
      } catch (error) {
        console.log(error, "in  IsHardDelete is")
      }
      
    }
    
     alert(`File with ID: ${fileId} has been deleted successfully.`);
     console.log(currentfolderpath , "currentfolderpath")
     console.log("currentEntity",currentEntity);
     
     //start
     if(ListToUpdate || currentEntity){
          console.log("Inside The check Of Entity->",currentEntity,"->",ListToUpdate);
          let currentList:any;
          if(ListToUpdate){
              currentList=ListToUpdate;
          }
          if(currentEntity){
              currentList=`DMS${currentEntity}FileMaster`;
          }
          console.log("selected List",currentList);
          // New Code Start create or update the DMSEntityFileMaster for delete operation.
          const currentFileDataRelatedToUser=await sp.web.lists
          .getByTitle(currentList).items.filter(`FileUID eq '${fileId}' and CurrentUser eq '${currentUserEmailRef.current}'`)();
          console.log("currentFileDataRelatedToUser",currentFileDataRelatedToUser);
          if(currentFileDataRelatedToUser.length > 0){
            console.log("Current file data present corresponding to the current user");
            const currentFileData=await sp.web.lists
            .getByTitle(currentList).items.filter(`FileUID eq '${fileId}'`)();
            currentFileData.forEach(async(file)=>{
              // console.log("file",file);
              await sp.web.lists.getByTitle(currentList).items.getById(file.Id).update({
                IsDeleted:isoDate  
              });
            })
          }else{
            console.log("Current file data does not present corresponding to the current user");
            const payload={
              FileName:"",
              FileUID:fileId,
              FileVersion:"",
              FileSize:"",
              CurrentUser:currentUserEmailRef.current,
              CurrentFolderPath:currentfolderpath,
              DocumentLibraryName:currentDocumentLibrary,
              FolderName:currentFolder,
              SiteName:currentEntity,
              SiteID:siteID,
              Status:"",
              FilePreviewURL:""
            }
            const file:any = await web.getFileById(fileId).select("Name", "Length", "ServerRelativeUrl", "UniqueId","MajorVersion","ListItemAllFields/Status","ListItemAllFields/IsDeleted").expand('ListItemAllFields')();
            console.log("file",file);

            // Encode the file name and construct the preview URL
            const encodedFilePath = encodeURIComponent(file.ServerRelativeUrl);
            // Example: 
            // serverRelativeUrl = "/sites/AlRostmani/test/DocumentLibraryInsideTest/Book.xlsx"
            const parentFolder = file.ServerRelativeUrl.substring(0, file.ServerRelativeUrl.lastIndexOf('/'));
            const siteUrl = window.location.origin;
            // const previewUrl = `${siteUrl}/sites/AlRostmani/DMSOrphanDocs/Forms/AllItems.aspx?id=${encodedFilePath}&parent=${encodeURIComponent(parentFolder)}`;
            const previewUrl = `${siteUrl}/sites/SPFXDemo/${currentEntity}/Forms/AllItems.aspx?id=${encodedFilePath}&parent=${encodeURIComponent(parentFolder)}`;
            console.log("previewUrl",previewUrl);
            payload.FilePreviewURL=previewUrl

            payload.FileName=file.Name;
            payload.FileSize=((file.Length as unknown as number) / (1024 * 1024)).toFixed(2);
            payload.FileVersion=String(file.MajorVersion)
            payload.Status=file.ListItemAllFields.Status

            const addData=await sp.web.lists.getByTitle(currentList).items.add(payload);
            console.log("addData",addData);


            const currentFile=await sp.web.lists
            .getByTitle(currentList).items.filter(`FileUID eq '${fileId}'`)();

            currentFile.forEach(async(file)=>{
              await sp.web.lists.getByTitle(currentList).items.getById(file.Id).update({
                IsDeleted:isoDate  
              });
            })
          }
          // End
          
          // const items999 = await sp.web.lists
          // .getByTitle(currentList).items.filter(`FileUID eq '${fileId}'`).top(1)();
          // alert(items999)
          
          // if (items999.length > 0) {
          // const itemId = items999[0].ID;

          
          // if(IsHardDelete === "true"){
          //   // alert( `in true IsHardDelete is ${IsHardDelete}`)
          //  try {
          //   await sp.web.lists.getByTitle(currentList).items.getById(itemId).delete();
          //   console.log(`Item with FileUid ${fileId} has been deleted.`);
          //  } catch (error) {
          //     console.log(error, "in true IsHardDelete is")
          //  }
             
          // }else if(IsHardDelete === "false"){
          //   // alert( `in false IsHardDelete is ${IsHardDelete}`)

          //   try {
          //     // await sp.web.lists.getByTitle(currentList).items.getById(itemId).update({
          //     //   IsDeleted:isoDate  
          //     // });
          //     console.log(`Item with FileUid ${fileId} has been deleted.`);
          //   } catch (error) {
          //     console.log(error, "in false IsHardDelete is")
          //   }
           
          // }
          

          // // Delete the item by ID
          // // await sp.web.lists.getByTitle(currentList).items.getById(itemId).delete();
          // // console.log(`Item with FileUid ${fileId} has been deleted.`);
          // }
      }
      // end
    console.log("currentfolderpath",currentfolderpath,"currentsiteID",currentsiteID,"currentDocumentLibrary",currentDocumentLibrary)
     getdoclibdata(currentfolderpath, currentsiteID , currentDocumentLibrary)
    //  getfolderdata(currentfolderpath,currentsiteID)
};
  
    
    //Manage Folder Permission Action 
  // window.managePermission=(message:string)=>{
  //   console.log(message);
  // }
  
  // Manage Folder WorkFlow Action
  
  // Manage Folder View Action
  window.view=(message:string)=>{
    console.log(message);
  }
  
  
  
  // My ctreated folder 
  const createFileButton2 = document.getElementById('createFileButton2')
  const createFileButton = document.getElementById('createFileButton')
  // const mycreatedfolders = async (event:any=null, searchText:any=null )=>{
  //   const wait = document.getElementById('files-container')
  //   wait.classList.remove('hidemydatacards')
  //   if(createFileButton2){
  //     createFileButton2.style.display = 'none'
  //     }
  //     if(createFileButton){
  //     createFileButton.style.display = 'none'
  //     }
  //   setlistorgriddata('')
  //   setlistorgriddata('')
  //   setShowMyrequButtons(false)
  //   setShowMyfavButtons(false)

  //   if(event){
  //     event.preventDefault()
  //     event.stopPropagation()
  //   }
   
  //   // start
  //   // call this function onClick of the myFolder Button
  //   // handleShowContent(event)
  //   // end
  //   if(createFileButton2){
  //      createFileButton2.style.display = 'none'
  //   }
  //    if(createFileButton){
  //   createFileButton.style.display = 'none'
  //    }  
  //    const hidegidvewlistviewbutton = document.getElementById('hidegidvewlistviewbutton')
  //    if (hidegidvewlistviewbutton) {
  //     console.log("enter here .....................")
  //     hidegidvewlistviewbutton.style.display = 'none'
     
  //   }
  //   const folderItems = await sp.web.lists
  //   .getByTitle("DMSFolderMaster")
  //   .items.select("CurrentUser" , "IsFolder" , "FolderPath" , "DocumentLibraryName","SiteTitle","ID" , "IsPrivate")
  //   .filter(`IsLibrary eq 1 and CurrentUser eq '${currentUserEmailRef.current}'`)();
  //   console.log(folderItems , "folderItems");

  //   // new code to fetch the siteId from the masterSiteURl and map this siteid with corresponding siteTitle forEach folder in the folderData that fetch from the DMSFolderMaster
  //   const dataFromMasterSiteURL=await sp.web.lists.getByTitle("MasterSiteURL").items.select("Title","SiteID").filter(`Active eq 'Yes'`)();
  //   console.log("dataFromMasterSiteURL",dataFromMasterSiteURL);

  //   const siteMap=new Map();
  //   dataFromMasterSiteURL.forEach(site => {
  //     siteMap.set(site.Title, site.SiteID);
  //   });

  //   const folderDataWithSiteId= folderItems.map(folder => {
  //      // Get the SiteID or null if not found
  //     const siteID = siteMap.get(folder.SiteTitle) || null;
  //     return {
  //       ...folder,
  //       // Append SiteID to the folder object
  //       SiteID: siteID
  //     };
  //   });

  //   console.log("Resultant folder data",folderDataWithSiteId);
  //   // end new code

  //   const container = document.getElementById("files-container");
  //   container.innerHTML = "";
  //   const folderimg = require('../assets/Folder.png')
   
  //   // start
  //   console.log("searchInput",searchText);
  //   routeToDiffSideBar="myFolder";
  //   let filteredFileData;
  //   if(searchText !== null){
  //     // here we change the array to new siteId containing array
  //     filteredFileData=folderDataWithSiteId.filter((folder: any) =>
  //          folder.DocumentLibraryName.toLowerCase().includes(searchText.value.toLowerCase())
  //     // ||   folder.FolderName.toLowerCase().includes(searchText.value.toLowerCase())
  //     // ||   folder.ParentFolder.toLowerCase().includes(searchText.value.toLowerCase())
  //   )
  //   }else{
  //     // here we change the array to new siteId containing array
  //     filteredFileData=folderDataWithSiteId;
  //     console.log("filteredFileData",filteredFileData)
  //   }
  //   // end
  //   // change the array name in the for loop
  //   for(const files of filteredFileData){
  //     let folderisprivateorpublic : any = ""
  //     if(files.IsPrivate === true){
  //       folderisprivateorpublic = "Private"
  //     }else if(files.IsPrivate === false){
  //       folderisprivateorpublic = "Public"
  //     }else if(files.IsPrivate === null){
  //       folderisprivateorpublic = "Null"
  //     }
  //     console.log("files111",files);
  //     const card = document.createElement("div");
 
  //     card.className = "card";
  //     card.innerHTML = `
  //       <div class="IMGContainer">  
  //        <div class="CardTextContainer">
  //     <img class="filextension" src=${folderimg} icon"/>
  //     </div> 
  //     <p class="p1st">${files.DocumentLibraryName}</p>
  //     <p class="p2nd"></p>
  //     <p class="p3rd">${files.SiteTitle}</p>
  //     <p class="filestatus"> ${folderisprivateorpublic}  </p>
  //     <div class="three-dots" onclick="toggleMenu2('${files.ID}')">
  //         <span>...</span>
  //     </div>
  //              </div>
  //   `;
  //   const menu = document.createElement("div");
  //   menu.id =`menu-${files.ID}`;
  //   menu.className = "popup-menu";
  //   menu.innerHTML = `
  //   <ul>
  //        <li onclick="managePermission('${files.DocumentLibraryName}','${files.SiteTitle}','${files.SiteID}')">
  //         <img src=${managePermissionIcon} alt="ManagePermission"/>
  //         Manage Permission
  //     </li>
  //     <li onclick="manageWorkflow('${files.DocumentLibraryName}','${files.SiteTitle}','${files.SiteID}')">
  //       <img src=${manageWorkFlowIcon} alt="ManageWorkFlow"/>
  //       Manage Workflow
  //     </li>
  //     <li onclick="editFile('${files.SiteTitle}','${files.DocumentLibraryName}')">
  //       <img src=${editIcon} alt="Edit"/>
  //       Edit
  //     </li>

  //   </ul>
  //   `;
  //   // menu.innerHTML = `
  //   // <ul>
  //   //      <li onclick="managePermission('${files.DocumentLibraryName}','${files.SiteTitle}','${files.SiteID}')">
  //   //       <img src=${managePermissionIcon} alt="ManagePermission"/>
  //   //       Manage Permission
  //   //   </li>
  //   //   <li onclick="manageWorkflow('${files.DocumentLibraryName}','${files.SiteTitle}','${files.SiteID}')">
  //   //     <img src=${manageWorkFlowIcon} alt="ManageWorkFlow"/>
  //   //     Manage Workflow
  //   //   </li>
  //   //   <li onclick="editFile('${files.SiteTitle}','${files.DocumentLibraryName}')">
  //   //     <img src=${editIcon} alt="Edit"/>
  //   //     Edit
  //   //   </li>
  //   //   <li onclick="view('view')">
  //   //     <img src=${viewIcon} alt="View"/>
  //   //     View
  //   //   </li>
  //   //   <li onclick="deleteFile('delete')">
  //   //     <img src=${deleteIcon} alt="Delete"/>
  //   //     Delete
  //   //   </li>  
  //   // </ul>
  //   // `;
   
  //   card.appendChild(menu);
  //   const fileStatusElement = card.querySelector(".filestatus") as HTMLElement;
  //   switch (files.IsPrivate) {
  //     case false:
  //       fileStatusElement.style.backgroundColor = "#b5e7d3";
  //       fileStatusElement.style.color = "#008751";
  //       break;
  //     case true:
  //       fileStatusElement.style.backgroundColor = "rgba(241, 85, 108, 0.1)";
  //       fileStatusElement.style.color = "#f1556c";
  //       break;
  //     case null:
  //       fileStatusElement.style.backgroundColor = "gray";
  //       fileStatusElement.style.color = "white";
  //       break;
  //         default:
  //           fileStatusElement.style.backgroundColor = "gray";
  //           fileStatusElement.style.color = "white";
  //           break;
  //   }
    
  //   container.appendChild(card);
  //   }
   
  // }
   // This Function is Called when we click on the MyFavourite
  // This Function is Called when we click on the MyFavourite
   // This Function is Called when we click on the MyFavourite
  //  const myFavorite= async (event: any = null, siteIdToUpdate: string = null,searchText:any=null) => {
  //   // // alert()
  //   // setlistorgriddata('')
  //   // setMyreqormyfav('Myfavourite')
  //   // // setShowButtons(true)
  //   // setShowMyrequButtons(false)
  //   // setShowMyfavButtons(true)


  //   setTimeout(() => {
  //     // alert("set timer")
  //     setlistorgriddata('');  // Update state to '' after a delay
 
  //     console.log(listorgriddata, "list")
  //   }, 100);
    
  //   const wait = document.getElementById('files-container')
  //   wait.classList.remove('hidemydatacards')
  //   setShowMyrequButtons(false)
  //   setShowMyfavButtons(true)
  //   setMyreqormyfav((previous)=>'Myfavourite')
   
  //   // setlistorgriddata('')
  //   const hidegidvewlistviewbutton=document.getElementById("hidegidvewlistviewbutton")
  //   if (hidegidvewlistviewbutton) {
  //     console.log("enter here .....................")
  //     hidegidvewlistviewbutton.style.display = 'none'
     
  //   }

  //   const hidegidvewlistviewbutton2=document.getElementById("hidegidvewlistviewbutton2")
  //   if (hidegidvewlistviewbutton2) {
  //     console.log("enter here .....................")
  //     hidegidvewlistviewbutton2.style.display = 'flex'
     
  //   }

  //   // const hidegidvewlistviewbutton2=document.getElementById("hidegidvewlistviewbutton2")
  //   // if (hidegidvewlistviewbutton2) {
  //   //   console.log("enter here .....................")
  //   //   hidegidvewlistviewbutton2.style.display = 'none'
     
  //   // }

  //   // const hidegidvewlistviewbutton2=document.getElementById("hidegidvewlistviewbutton2")
  //   // if (hidegidvewlistviewbutton2) {
  //   //   console.log("enter here .....................")
  //   //   hidegidvewlistviewbutton2.style.display = 'flex'
     
  //   // }

  //   if(event) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  
  //   console.log("myFavorite Function is called");
  
  //   const container = document.getElementById("files-container");
  //   if(siteIdToUpdate ===  null){
  //       container.innerHTML="";
  //   }

    
  
  //   // Fetch the list of active lists
  //   const FilesItems = await sp.web.lists
  //     .getByTitle("MasterSiteURL")
  //     .items.select("Title", "SiteID", "FileMasterList", "Active")
  //     .filter(`Active eq 'Yes'`)();
  
  //   console.log("Files items", FilesItems);
  //   console.log("searchInput",searchText);
  //   FilesItems.forEach(async (fileItem) => {
  //     if (fileItem.FileMasterList !== null) {
  
  //       console.log("siteIdToUpdate",siteIdToUpdate)
  //       // Skip rendering if we're updating only a specific list
  //       if (siteIdToUpdate && fileItem.SiteID !== siteIdToUpdate) {
  //         return;
  //       }
  
  //       console.log("SiteIddd", fileItem.SiteID);
  
  //       // Fetch files marked as favorite
  //       const filesData = await sp.web.lists
  //         .getByTitle(`${fileItem.FileMasterList}`)
  //         .items.select("ID","FileName", "FileUID", "FileSize", "FileVersion","IsDeleted","DocumentLibraryName","CurrentFolderPath","SiteName","Status","SiteID","FilePreviewURL")
  //         .filter(
  //           `IsFavourite eq 1 and CurrentUser eq '${currentUserEmailRef.current}'`
  //         )();
  //         // ("ID" , "FileName", "FileUID", "FileSize", "FileVersion" ,"Status" , "SiteID","CurrentFolderPath","DocumentLibraryName","SiteName","FilePreviewURL")
  
  //       console.log("Files", filesData);
  
  //       // Remove existing content for this specific list to avoid duplication
  //       const listElements = document.querySelectorAll(
  //         `[data-list-id='${fileItem.SiteID}']`
  //       );
  //       console.log("ListElemet To update",listElements)
  //       listElements.forEach((el) => el.remove());

  //       // start
  //       routeToDiffSideBar="myFavourite";
  //       let filteredFileData;
  //       if(searchText !== null){
  //         filteredFileData=filesData.filter((file: any) => file.FileName.toLowerCase().includes(searchText.value.toLowerCase()))
  //         // console.log("this is filtered data",filteredFileData)
  //       }else{
  //         filteredFileData=filesData;
  //       }
  //       // end

  //       // change the array name
  //       // Render only the updated list's items
  //       console.log("fl data",filteredFileData)
  //       filteredFileData.forEach((file) => {
  //         console.log("hello---> ")
  //         console.log("file.IsDeleted",file.IsDeleted);
  //         console.log("file.Status",file.Status);
  //         if(file.IsDeleted === null){
  //             const {fileIcon, fileExtension}= getFileIcon(file.FileName);
  //             const card = createFileCard(file, fileIcon, fileItem.SiteID,fileItem.FileMasterList,fileExtension,file.CurrentFolderPath,file.FileName);
  //             container.appendChild(card);   
  //         }
  //       });
  //     }
  //   });
  
  //   return;
  // // };
  // const myFavorite= async (event: any = null, siteIdToUpdate: string = null,searchText:any=null) => {
  //   // // alert()
  //   // setlistorgriddata('')
  //   // setMyreqormyfav('Myfavourite')
  //   // // setShowButtons(true)
  //   // setShowMyrequButtons(false)
  //   // setShowMyfavButtons(true)


  //   setTimeout(() => {
  //     // alert("set timer")
  //     setlistorgriddata('');  // Update state to '' after a delay
 
  //     console.log(listorgriddata, "list")
  //   }, 100);
    
  //   const wait = document.getElementById('files-container')
  //   wait.classList.remove('hidemydatacards')
  //   setShowMyrequButtons(false)
  //   setShowMyfavButtons(true)
  //   setMyreqormyfav((previous)=>'Myfavourite')
   
  //   // setlistorgriddata('')
  //   const hidegidvewlistviewbutton=document.getElementById("hidegidvewlistviewbutton")
  //   if (hidegidvewlistviewbutton) {
  //     console.log("enter here .....................")
  //     hidegidvewlistviewbutton.style.display = 'none'
     
  //   }

  //   const hidegidvewlistviewbutton2=document.getElementById("hidegidvewlistviewbutton2")
  //   if (hidegidvewlistviewbutton2) {
  //     console.log("enter here .....................")
  //     hidegidvewlistviewbutton2.style.display = 'flex'
     
  //   }

  //   // const hidegidvewlistviewbutton2=document.getElementById("hidegidvewlistviewbutton2")
  //   // if (hidegidvewlistviewbutton2) {
  //   //   console.log("enter here .....................")
  //   //   hidegidvewlistviewbutton2.style.display = 'none'
     
  //   // }

  //   // const hidegidvewlistviewbutton2=document.getElementById("hidegidvewlistviewbutton2")
  //   // if (hidegidvewlistviewbutton2) {
  //   //   console.log("enter here .....................")
  //   //   hidegidvewlistviewbutton2.style.display = 'flex'
     
  //   // }

  //   if(event) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  
  //   console.log("myFavorite Function is called");
  
  //   const container = document.getElementById("files-container");
  //   if(siteIdToUpdate ===  null){
  //       container.innerHTML="";
  //   }

    
  
  //   // Fetch the list of active lists
  //   const FilesItems = await sp.web.lists
  //     .getByTitle("MasterSiteURL")
  //     .items.select("Title", "SiteID", "FileMasterList", "Active")
  //     .filter(`Active eq 'Yes'`)();
  
  //   console.log("Files items", FilesItems);
  //   console.log("searchInput",searchText);
  //   FilesItems.forEach(async (fileItem) => {
  //     if (fileItem.FileMasterList !== null) {
  
  //       console.log("siteIdToUpdate",siteIdToUpdate)
  //       // Skip rendering if we're updating only a specific list
  //       if (siteIdToUpdate && fileItem.SiteID !== siteIdToUpdate) {
  //         return;
  //       }
  
  //       console.log("SiteIddd", fileItem.SiteID);
  
  //       // Fetch files marked as favorite
  //       const filesData = await sp.web.lists
  //         .getByTitle(`${fileItem.FileMasterList}`)
  //         .items.select("ID","FileName", "FileUID", "FileSize", "FileVersion","IsDeleted","DocumentLibraryName","CurrentFolderPath","SiteName","Status","SiteID","FilePreviewURL")
  //         .filter(
  //           `IsFavourite eq 1 and CurrentUser eq '${currentUserEmailRef.current}'`
  //         )();
  //         // ("ID" , "FileName", "FileUID", "FileSize", "FileVersion" ,"Status" , "SiteID","CurrentFolderPath","DocumentLibraryName","SiteName","FilePreviewURL")
  
  //       console.log("Files", filesData);
  
  //       // Remove existing content for this specific list to avoid duplication
  //       const listElements = document.querySelectorAll(
  //         `[data-list-id='${fileItem.SiteID}']`
  //       );
  //       console.log("ListElemet To update",listElements)
  //       listElements.forEach((el) => el.remove());

  //       // start
  //       routeToDiffSideBar="myFavourite";
  //       let filteredFileData;
  //       if(searchText !== null){
  //         filteredFileData=filesData.filter((file: any) => file.FileName.toLowerCase().includes(searchText.value.toLowerCase()))
  //         // console.log("this is filtered data",filteredFileData)
  //       }else{
  //         filteredFileData=filesData;
  //       }
  //       // end

  //       // change the array name
  //       // Render only the updated list's items
  //       console.log("fl data",filteredFileData)
  //       filteredFileData.forEach((file) => {
  //         console.log("hello---> ")
  //         console.log("file.IsDeleted",file.IsDeleted);
  //         console.log("file.Status",file.Status);
  //         if(file.IsDeleted === null){
  //             const {fileIcon, fileExtension}= getFileIcon(file.FileName);
  //             const card = createFileCard(file, fileIcon, fileItem.SiteID,fileItem.FileMasterList,fileExtension,file.CurrentFolderPath,file.FileName);
  //             container.appendChild(card);   
  //         }
  //       });
  //     }
  //   });
  
  //   return;
  // };
     // This Function is Called when we click on the MyFavourite
    // New code for CreateFolder
// const mycreatedfolders = async (event:any=null, searchText:any=null )=>{
//   const wait = document.getElementById('files-container')
//   wait.classList.remove('hidemydatacards')
//   if(createFileButton2){
//     createFileButton2.style.display = 'none'
//     }
//     if(createFileButton){
//     createFileButton.style.display = 'none'
//     }
//   setlistorgriddata('')
//   setlistorgriddata('')
//   setShowMyrequButtons(false)
//   setShowMyfavButtons(false)

//   if(event){
//     event.preventDefault()
//     event.stopPropagation()
//   }
//   // clean the url start
//   const newUrl = `${window.location.origin}${window.location.pathname}`;
//   window.history.pushState(null, '', newUrl)
//   // end

//   // start
//   // call this function onClick of the myFolder Button
//   // handleShowContent(event)
//   // end
//   if(createFileButton2){
//      createFileButton2.style.display = 'none'
//   }
//    if(createFileButton){
//   createFileButton.style.display = 'none'
//    }  
//    const hidegidvewlistviewbutton = document.getElementById('hidegidvewlistviewbutton')
//    if (hidegidvewlistviewbutton) {
//     console.log("enter here .....................")
//     hidegidvewlistviewbutton.style.display = 'none'
   
//   }
//   const folderItems = await sp.web.lists
//   .getByTitle("DMSFolderMaster")
//   .items.select("CurrentUser" , "IsFolder" , "FolderPath" , "DocumentLibraryName","SiteTitle","ID" , "IsPrivate" , "")
//   .filter(`IsLibrary eq 1 and CurrentUser eq '${currentUserEmailRef.current}'`).orderBy("Created", false)();
//   // console.log(folderItems , "folderItems");

//   // new code to fetch the siteId from the masterSiteURl and map this siteid with corresponding siteTitle forEach folder in the folderData that fetch from the DMSFolderMaster
//   const dataFromMasterSiteURL=await sp.web.lists.getByTitle("MasterSiteURL").items.select("Title","SiteID").filter(`Active eq 'Yes'`)();
//   console.log("dataFromMasterSiteURL",dataFromMasterSiteURL);

//   const siteMap=new Map();
//   dataFromMasterSiteURL.forEach(site => {
//     siteMap.set(site.Title, site.SiteID);
//   });

//   const folderDataWithSiteId= folderItems.map(folder => {
//      // Get the SiteID or null if not found
//     const siteID = siteMap.get(folder.SiteTitle) || null;
//     return {
//       ...folder,
//       // Append SiteID to the folder object
//       SiteID: siteID
//     };
//   });

//   console.log("Resultant folder data",folderDataWithSiteId);
//   // end new code

//   const container = document.getElementById("files-container");
//   container.innerHTML = "";
//   const folderimg = require('../assets/Folder.png')
 
//   // start
//   console.log("searchInput",searchText);
//   routeToDiffSideBar="myFolder";
//   let filteredFileData;
//   if(searchText !== null){
//     // here we change the array to new siteId containing array
//     filteredFileData=folderDataWithSiteId.filter((folder: any) =>
//          folder.DocumentLibraryName.toLowerCase().includes(searchText.value.toLowerCase())
//     // ||   folder.FolderName.toLowerCase().includes(searchText.value.toLowerCase())
//     // ||   folder.ParentFolder.toLowerCase().includes(searchText.value.toLowerCase()) 
//   )

//   if(filteredFileData.length === 0 && searchText !== null){
//     console.log("combineArray",filteredFileData);
//     fileNotFound(`No folder match ${searchText.value}`);
//   }
//   }else{
//     // here we change the array to new siteId containing array
//     filteredFileData=folderDataWithSiteId;
//     console.log("filteredFileData",filteredFileData)
//   }
//   // end
//   // change the array name in the for loop
//   for(const files of filteredFileData){
//     let folderisprivateorpublic : any = ""
//     if(files.IsPrivate === true){
//       folderisprivateorpublic = "Private"
//     }else if(files.IsPrivate === false){
//       folderisprivateorpublic = "Public"
//     }else if(files.IsPrivate === null){
//       folderisprivateorpublic = "Null"
//     }
//     // console.log("files111",files);
//     const card = document.createElement("div");

//     card.className = "card";
//     card.innerHTML = `
//       <div class="IMGContainer">  
//        <div class="CardTextContainer">
//     <img class="filextension" src=${folderimg} icon"/>
//     </div>
//     <p class="p1st">${files.DocumentLibraryName}</p>
//     <p class="p2nd"></p>
//     <p class="p3rd">${files.SiteTitle}</p>
//     <p class="filestatus"> ${folderisprivateorpublic}  </p>
//     <div class="three-dots" onclick="toggleMenu2('${files.ID}')">
//         <span>...</span>
//     </div>
//              </div>
//   `;
//   const menu = document.createElement("div");
//   menu.id =`menu-${files.ID}`;
//   menu.className = "popup-menu";
//   menu.innerHTML = `
//   <ul>
//        <li onclick="managePermission('${files.DocumentLibraryName}','${files.SiteTitle}','${files.SiteID}','${files.FolderName}','${files.FolderPath}')">
//         <img src=${managePermissionIcon} alt="ManagePermission"/>
//         Manage Permission
//     </li>
//     <li onclick="manageWorkflow('${files.DocumentLibraryName}','${files.SiteTitle}','${files.SiteID}')">
//       <img src=${manageWorkFlowIcon} alt="ManageWorkFlow"/>
//       Manage Workflow
//     </li>
//     <li onclick="editFile('${files.SiteTitle}','${files.DocumentLibraryName}')">
//       <img src=${editIcon} alt="Edit"/>
//       Edit
//     </li>

//   </ul>
//   `;
//   // menu.innerHTML = `
//   // <ul>
//   //      <li onclick="managePermission('${files.DocumentLibraryName}','${files.SiteTitle}','${files.SiteID}')">
//   //       <img src=${managePermissionIcon} alt="ManagePermission"/>
//   //       Manage Permission
//   //   </li>
//   //   <li onclick="manageWorkflow('${files.DocumentLibraryName}','${files.SiteTitle}','${files.SiteID}')">
//   //     <img src=${manageWorkFlowIcon} alt="ManageWorkFlow"/>
//   //     Manage Workflow
//   //   </li>
//   //   <li onclick="editFile('${files.SiteTitle}','${files.DocumentLibraryName}')">
//   //     <img src=${editIcon} alt="Edit"/>
//   //     Edit
//   //   </li>
//   //   <li onclick="view('view')">
//   //     <img src=${viewIcon} alt="View"/>
//   //     View
//   //   </li>
//   //   <li onclick="deleteFile('delete')">
//   //     <img src=${deleteIcon} alt="Delete"/>
//   //     Delete
//   //   </li>  
//   // </ul>
//   // `;
 
//   card.appendChild(menu);
//   const fileStatusElement = card.querySelector(".filestatus") as HTMLElement;
//   switch (files.IsPrivate) {
//     case false:
//       fileStatusElement.style.backgroundColor = "#b5e7d3";
//       fileStatusElement.style.color = "#008751";
//       break;
//     case true:
//       fileStatusElement.style.backgroundColor = "rgba(241, 85, 108, 0.1)";
//       fileStatusElement.style.color = "#f1556c";
//       break;
//     case null:
//       fileStatusElement.style.backgroundColor = "gray";
//       fileStatusElement.style.color = "white";
//       break;
//         default:
//           fileStatusElement.style.backgroundColor = "gray";
//           fileStatusElement.style.color = "white";
//           break;
//   }
 
//   container.appendChild(card);
//   }
 
// }
const mycreatedfolders = async (event:any=null, searchText:any=null )=>{
  const wait = document.getElementById('files-container')
  wait.classList.remove('hidemydatacards')
  if(createFileButton2){
    createFileButton2.style.display = 'none'
    }
    if(createFileButton){
    createFileButton.style.display = 'none'
    }
  setlistorgriddata('')
  setlistorgriddata('')
  setShowMyrequButtons(false)
  setShowMyfavButtons(false)
 
  if(event){
    event.preventDefault()
    event.stopPropagation()
  }
  // clean the url start
  const newUrl = `${window.location.origin}${window.location.pathname}`;
  window.history.pushState(null, '', newUrl)
  // end
 
  // start
  // call this function onClick of the myFolder Button
  // handleShowContent(event)
  // end
  if(createFileButton2){
     createFileButton2.style.display = 'none'
  }
   if(createFileButton){
  createFileButton.style.display = 'none'
   }  
   const hidegidvewlistviewbutton = document.getElementById('hidegidvewlistviewbutton')
   if (hidegidvewlistviewbutton) {
    console.log("enter here .....................")
    hidegidvewlistviewbutton.style.display = 'none'
   
  }
  const folderItems = await sp.web.lists
  .getByTitle("DMSFolderMaster")
  .items.select("CurrentUser" , "IsFolder" , "FolderPath" , "DocumentLibraryName","SiteTitle","ID" , "IsPrivate","IsLibrary","FolderName")
  .filter(`CurrentUser eq '${currentUserEmailRef.current}'`).orderBy("Created", false)();
  // console.log(folderItems , "folderItems");
 
  // new code to fetch the siteId from the masterSiteURl and map this siteid with corresponding siteTitle forEach folder in the folderData that fetch from the DMSFolderMaster
  const dataFromMasterSiteURL=await sp.web.lists.getByTitle("MasterSiteURL").items.select("Title","SiteID").filter(`Active eq 'Yes'`)();
  console.log("dataFromMasterSiteURL",dataFromMasterSiteURL);
 
  // check the folder permission start
 
  // if(folderItems[0].IsLibrary){
  //   console.log(`folder path - ${folderItems[0].FolderPath}`)
  //   try {
  //     const library = await sp.web.getList(`${folderItems[0].FolderPath}`).roleAssignments.expand("Member", "RoleDefinitionBindings")();
 
  //     library.forEach((assignment:any) => {
  //         console.log("Assigned to:", assignment.Member.Title);
  //         console.log(
  //             "Roles:",
  //             assignment.RoleDefinitionBindings.map((role:any) => role.Name).join(", ")
  //         );
  //     });
  // } catch (error) {
  //     console.error("Error fetching library permissions:", error);
  // }
  // }
 
 
    // end
 
  const siteMap=new Map();
  dataFromMasterSiteURL.forEach(site => {
    siteMap.set(site.Title, site.SiteID);
  });
 
  const folderDataWithSiteId= folderItems.map(folder => {
     // Get the SiteID or null if not found
    const siteID = siteMap.get(folder.SiteTitle) || null;
    return {
      ...folder,
      // Append SiteID to the folder object
      SiteID: siteID
    };
  });
 
  console.log("Resultant folder data",folderDataWithSiteId);
  // end new code
 
  const container = document.getElementById("files-container");
  container.innerHTML = "";
  const folderimg = require('../assets/Folder.png')
 
  // start
  console.log("searchInput",searchText);
  routeToDiffSideBar="myFolder";
  let filteredFileData;
  if(searchText !== null){
    // here we change the array to new siteId containing array
    filteredFileData=folderDataWithSiteId.filter((folder: any) =>
         folder.DocumentLibraryName.toLowerCase().includes(searchText.value.toLowerCase())
    // ||   folder.FolderName.toLowerCase().includes(searchText.value.toLowerCase())
    // ||   folder.ParentFolder.toLowerCase().includes(searchText.value.toLowerCase())
  )
 
  if(filteredFileData.length === 0 && searchText !== null){
    console.log("combineArray",filteredFileData);
    fileNotFound(`No folder match ${searchText.value}`);
  }
  }else{
    // here we change the array to new siteId containing array
    filteredFileData=folderDataWithSiteId;
    console.log("filteredFileData",filteredFileData)
  }
  // end
  // change the array name in the for loop
  for(const files of filteredFileData){
    // console.log("FolderName",files.FolderName);
    let folderName='';
    if(files.IsLibrary === true){
      folderName=files.DocumentLibraryName;
    }else if(files.IsFolder === true){
      folderName=files.FolderName;
    }
    let folderisprivateorpublic : any = ""
    if(files.IsPrivate === true){
      folderisprivateorpublic = "Private"
    }else if(files.IsPrivate === false){
      folderisprivateorpublic = "Public"
    }else if(files.IsPrivate === null){
      folderisprivateorpublic = "Null"
    }
    // console.log("files111",files);
    const card = document.createElement("div");
 
    card.className = "card";
    card.innerHTML = `
      <div class="IMGContainer">  
       <div class="CardTextContainer">
    <img class="filextension" src=${folderimg} icon"/>
    </div>
    <p class="p1st">${folderName}</p>
    <p class="p2nd"></p>
    <p class="p3rd">${files.SiteTitle}</p>
    <p class="filestatus"> ${folderisprivateorpublic}  </p>
    <div class="three-dots" onclick="toggleMenu2('${files.ID}')">
        <span>...</span>
    </div>
             </div>
  `;
  const menu = document.createElement("div");
  menu.id =`menu-${files.ID}`;
  menu.className = "popup-menu";
  menu.innerHTML = `
  <ul>
       <li onclick="managePermission('${files.DocumentLibraryName}','${files.SiteTitle}','${files.SiteID}','${files.FolderName}','${files.FolderPath}')">
        <img src=${managePermissionIcon} alt="ManagePermission"/>
        Manage Permission
    </li>
    <li onclick="manageWorkflow('${files.DocumentLibraryName}','${files.SiteTitle}','${files.SiteID}')">
      <img src=${manageWorkFlowIcon} alt="ManageWorkFlow"/>
      Manage Workflow
    </li>
    <li onclick="editFile('${files.SiteTitle}','${files.DocumentLibraryName}')">
      <img src=${editIcon} alt="Edit"/>
      Edit
    </li>
 
  </ul>
  `;
  // menu.innerHTML = `
  // <ul>
  //      <li onclick="managePermission('${files.DocumentLibraryName}','${files.SiteTitle}','${files.SiteID}')">
  //       <img src=${managePermissionIcon} alt="ManagePermission"/>
  //       Manage Permission
  //   </li>
  //   <li onclick="manageWorkflow('${files.DocumentLibraryName}','${files.SiteTitle}','${files.SiteID}')">
  //     <img src=${manageWorkFlowIcon} alt="ManageWorkFlow"/>
  //     Manage Workflow
  //   </li>
  //   <li onclick="editFile('${files.SiteTitle}','${files.DocumentLibraryName}')">
  //     <img src=${editIcon} alt="Edit"/>
  //     Edit
  //   </li>
  //   <li onclick="view('view')">
  //     <img src=${viewIcon} alt="View"/>
  //     View
  //   </li>
  //   <li onclick="deleteFile('delete')">
  //     <img src=${deleteIcon} alt="Delete"/>
  //     Delete
  //   </li>  
  // </ul>
  // `;
 
  card.appendChild(menu);
  const fileStatusElement = card.querySelector(".filestatus") as HTMLElement;
  switch (files.IsPrivate) {
    case false:
      fileStatusElement.style.backgroundColor = "#b5e7d3";
      fileStatusElement.style.color = "#008751";
      break;
    case true:
      fileStatusElement.style.backgroundColor = "rgba(241, 85, 108, 0.1)";
      fileStatusElement.style.color = "#f1556c";
      break;
    case null:
      fileStatusElement.style.backgroundColor = "gray";
      fileStatusElement.style.color = "white";
      break;
        default:
          fileStatusElement.style.backgroundColor = "gray";
          fileStatusElement.style.color = "white";
          break;
  }
 
  container.appendChild(card);
  const menu1 = document.getElementById(`menu-${files.ID}`);
  if(files.IsFolder === true){
    const secondItem = menu1.children[0]?.children[1] as HTMLElement;
    const thirdItem = menu1.children[0]?.children[2] as HTMLElement;
    if (secondItem && secondItem.style.display !== "none") {
        secondItem.style.display = "none";
    }
    if (thirdItem && thirdItem.style.display !== "none") {
      thirdItem.style.display = "none";
    }
  }
}
 
}

     const myFavorite= async (event: any = null, siteIdToUpdate: string = null,searchText:any=null) => {
      // // alert()
      // setlistorgriddata('')
      // setMyreqormyfav('Myfavourite')
      // // setShowButtons(true)
      // setShowMyrequButtons(false)
      // setShowMyfavButtons(true)
  
      // clean the url start
      const newUrl = `${window.location.origin}${window.location.pathname}`;
      window.history.pushState(null, '', newUrl)
      if(createFileButton2){
        createFileButton2.style.display = 'none'
        }
        if(createFileButton){
        createFileButton.style.display = 'none'
        }
      // end
      setTimeout(() => {
        // alert("set timer")
        setlistorgriddata('');  // Update state to '' after a delay
   
        console.log(listorgriddata, "list")
      }, 100);
      
      const wait = document.getElementById('files-container')
      wait.classList.remove('hidemydatacards')
      setShowMyrequButtons(false)
      setShowMyfavButtons(true)
      setMyreqormyfav((previous)=>'Myfavourite')
     
      // setlistorgriddata('')
      // const hidegidvewlistviewbutton=document.getElementById("hidegidvewlistviewbutton")
      // if (hidegidvewlistviewbutton) {
      //   console.log("enter here .....................")
      //   hidegidvewlistviewbutton.style.display = 'flex'
       
      // }
  
      const hidegidvewlistviewbutton2=document.getElementById("hidegidvewlistviewbutton2")
      if (hidegidvewlistviewbutton2) {
        console.log("enter here .....................")
        hidegidvewlistviewbutton2.style.display = 'flex'
       
      }
  
      // const hidegidvewlistviewbutton2=document.getElementById("hidegidvewlistviewbutton2")
      // if (hidegidvewlistviewbutton2) {
      //   console.log("enter here .....................")
      //   hidegidvewlistviewbutton2.style.display = 'none'
       
      // }
  
      // const hidegidvewlistviewbutton2=document.getElementById("hidegidvewlistviewbutton2")
      // if (hidegidvewlistviewbutton2) {
      //   console.log("enter here .....................")
      //   hidegidvewlistviewbutton2.style.display = 'flex'
       
      // }
  
      if(event) {
        event.preventDefault();
        event.stopPropagation();
      }
    
      console.log("myFavorite Function is called");
    
      const container = document.getElementById("files-container");
      if(siteIdToUpdate ===  null){
          container.innerHTML="";
      }
  
      let combineArray:any[]=[];
    
      // Fetch the list of active lists
      const FilesItems = await sp.web.lists
        .getByTitle("MasterSiteURL")
        .items.select("Title", "SiteID", "FileMasterList", "Active")
        .filter(`Active eq 'Yes'`)();
    
      console.log("Files items", FilesItems);
      console.log("searchInput",searchText);
      FilesItems.forEach(async (fileItem,index) => {
        if (fileItem.FileMasterList !== null) {
    
          console.log("siteIdToUpdate",siteIdToUpdate)
          // Skip rendering if we're updating only a specific list
          if (siteIdToUpdate && fileItem.SiteID !== siteIdToUpdate) {
            return;
          }
    
          console.log("SiteIddd", fileItem.SiteID);
    
          // Fetch files marked as favorite
          const filesData = await sp.web.lists
            .getByTitle(`${fileItem.FileMasterList}`)
            .items.select("ID","FileName", "FileUID", "FileSize", "FileVersion","IsDeleted","DocumentLibraryName","CurrentFolderPath","SiteName","Status","SiteID","FilePreviewURL")
            .filter(
              `IsFavourite eq 1 and CurrentUser eq '${currentUserEmailRef.current}'`
            ).orderBy("Modified", false)();
            // ("ID" , "FileName", "FileUID", "FileSize", "FileVersion" ,"Status" , "SiteID","CurrentFolderPath","DocumentLibraryName","SiteName","FilePreviewURL")
    
          console.log("Files", filesData);
    
          // Remove existing content for this specific list to avoid duplication
          const listElements = document.querySelectorAll(
            `[data-list-id='${fileItem.SiteID}']`
          );
          console.log("ListElemet To update",listElements)
          listElements.forEach((el) => el.remove());
  
          // start
          routeToDiffSideBar="myFavourite";
          let filteredFileData;
          if(searchText !== null){
            filteredFileData=filesData.filter((file: any) => file.FileName.toLowerCase().includes(searchText.value.toLowerCase()))
  
            combineArray=[...combineArray, ...filteredFileData]
           if(combineArray.length === 0 && searchText !== null && FilesItems.length === index+1){
             console.log("combineArray",combineArray);
             fileNotFound(`No files match ${searchText.value}`);
           }
            // console.log("this is filtered data",filteredFileData)
          }else{
            filteredFileData=filesData;
          }
          // end
  
          // change the array name
          // Render only the updated list's items
          console.log("fl data",filteredFileData)
          filteredFileData.forEach((file) => {
            console.log("hello---> ")
            console.log("file.IsDeleted",file.IsDeleted);
            console.log("file.Status",file.Status);
            if(file.IsDeleted === null){
                const {fileIcon, fileExtension}= getFileIcon(file.FileName);
                const card = createFileCard(file, fileIcon, fileItem.SiteID,fileItem.FileMasterList,fileExtension,file.CurrentFolderPath,file.FileName);
                container.appendChild(card);   
            }
          });
        }
      });
    
      return;
    };
  // This Function create the File card
  // This Function create the File card

  
  const createFileCard = (file:any, fileIcon:any, siteId:any,listToUpdate:any,fileExtension:any,FolderPath:string,fileName:string) => {
    // fileID:string,siteId:string,currentFolderPathForFile:string,fileName:string,flag:string
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.fileId = file.FileUID; // Store file ID in the card element
    card.dataset.listId = siteId; // Store site ID
  
    card.innerHTML = `        
      <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
      <p class="p1st">${file.FileName}</p>
      <p class="p2nd">${file.FileVersion}</p>
      <p class="p3rd">${file.FileSize} MB</p>
      <div id="three-dots" class="three-dots" onclick="toggleMenu2('${file.FileUID}', '${siteId}')">
        <span>...</span>
      </div>
    `;
  
    const menu = document.createElement("div");
    menu.id = `menu-${file.FileUID}`;
    menu.className = "popup-menu";
    menu.innerHTML = `
      <ul>
        <li onclick="confirmDeleteFile('${file.FileUID}', '${siteId}','${false}','${listToUpdate}' )">
          <img src=${deleteIcon} alt="Delete"/> Delete
        </li>
        <li onclick="unMarkAsFavorite('${file.FileUID}', '${siteId}','${listToUpdate}')">
          <img src=${FillFavouriteFile} alt="Unmark as Favorite"/> Unmark as Favorite
        </li>
        <li onclick="shareFile('${file.FileUID}', '${file.SiteID}','${file.CurrentFolderPath}','${file.FileName}','MyFavourite','${file.FileVersion}','${file.FileSize}','${file.Status}','${file.FilePreviewURL}','${file.DocumentLibraryName}')">
          <img src=${ShareFile} alt="Share"/> Share
        </li>
      </ul>
    `;
  
    card.appendChild(menu);
  
    return card;
  };
  
  //Manage UnMark File  
    // @ts-ignore
    window.unMarkAsFavorite = async (fileId: number, siteId: string, listToUpdate: string) => {
      console.log("File Id is ", fileId);
      console.log("siteId is ", siteId,);
      console.log( "List ", listToUpdate);
   
      try {
        const list = sp.web.lists.getByTitle(`${listToUpdate}`);
        console.log("List", list);
        const isFavourite=false;
        const items = await list.items.filter(`FileUID eq '${fileId}' and CurrentUser eq '${currentUserEmailRef.current}' and MyRequest eq 0`)();
        console.log("File Data",items)
        if (items.length > 0) {
          if (items[0].IsFavourite && items[0].CurrentUser === currentUserEmailRef.current) {
            const itemId = items[0].Id;
            await list.items.getById(itemId).update({
              IsFavourite: isFavourite
            });
            console.log(`Item with FileUID '${fileId}' updated successfully.`);
            // Re-render only the modified list
            await myFavorite(null, siteId);
          }
       
        } else {
          console.log(`No item found with FileUID '${fileId}'.`);
        }
   
      } catch (error) {
        console.log("This error is from unMarkAsFavorite function ", error);
      }
    };
  
    // function to toggle between Favourite and UnFavourite
  // @ts-ignore
  window.toggleFavourite=async (fileId,siteId)=> {
   
    console.log("SiteId",siteId)
   
    const favouriteToggle = document.getElementById(`favouriteToggle-${fileId}`);  
    const markAsFavouriteIcon = favouriteToggle?.querySelector('.mark-as-favourite') as HTMLElement;
    const unMarkAsFavouriteIcon = favouriteToggle?.querySelector('.unmark-as-favourite') as HTMLElement;
    const textElement = favouriteToggle?.querySelector('.favourite-text') as HTMLElement;
   
    console.log("current Entity",currentEntity);
    let listToUpdate=`DMS${currentEntity}FileMaster`;
   
    async function markAsFavourite(fileId:any, siteId:any){
         
          const siteContext = await sp.site.openWebById(siteId);
          const folderData = await siteContext.web.getFolderByServerRelativePath(currentfolderpath).files.select("Name", "Length", "ServerRelativeUrl", "UniqueId","MajorVersion","ListItemAllFields/Status","ListItemAllFields/IsDeleted").expand('ListItemAllFields')();
          console.log("folderData",folderData);
   
          const isFavourite=true;
          const payload={
            FileName:"",
            FileUID:fileId,
            FileVersion:"",
            FileSize:"",
            IsFavourite:isFavourite,
            CurrentUser:currentUserEmailRef.current,
            CurrentFolderPath:currentfolderpath,
            DocumentLibraryName:currentDocumentLibrary,
            FolderName:currentFolder,
            SiteName:currentEntity,
            SiteID:siteId,
            Status:"",
            FilePreviewURL:""
          }
   
          folderData.forEach(async (file:any)=>{
            if(file.UniqueId === fileId){
              payload.FileName=file.Name;
              payload.FileSize=((file.Length as unknown as number) / (1024 * 1024)).toFixed(2);
              payload.FileVersion=String(file.MajorVersion)
              payload.Status=file.ListItemAllFields.Status   
              const encodedFilePath = encodeURIComponent(file.ServerRelativeUrl);
              const parentFolder = file.ServerRelativeUrl.substring(0, file.ServerRelativeUrl.lastIndexOf('/'));
              const siteUrl = window.location.origin;
              const previewUrl = `${siteUrl}/sites/AlRostmani/${currentEntity}/${currentDocumentLibrary}/Forms/AllItems.aspx?id=${encodedFilePath}&parent=${encodeURIComponent(parentFolder)}`;
              // const previewUrl = `${siteUrl}/sites/SPFXDemo/${currentEntity}/${currentDocumentLibrary}/Forms/AllItems.aspx?id=${encodedFilePath}&parent=${encodeURIComponent(parentFolder)}`;
              console.log("previewUrl",previewUrl);

              payload.FilePreviewURL=previewUrl             
            }
          })
          console.log(payload);
   
          // Get the list by name
          const list = sp.web.lists.getByTitle(listToUpdate);
   
          const data=await sp.web.lists.getByTitle(listToUpdate).items
          .filter(`FileUID eq '${fileId}' and CurrentUser eq '${currentUserEmailRef.current}' and MyRequest eq 0`)();
          console.log("Data",data);
   
          // Add the new item to the list
          if(data.length>0){
            const itemId = data[0].Id;
            console.log("items ID",itemId);
            if(!data[0].IsFavourite && currentUserEmailRef.current === data[0].CurrentUser){
           
                const updatedData=await sp.web.lists.getByTitle(listToUpdate).items.getById(itemId).update({
                  IsFavourite:true
                });
                console.log("Updated data",updatedData)
          }
   
          }else{
              const addedItem = await list.items.add(payload);
              console.log("New item added successfully:", addedItem);
          }
         
    }
   
   
    async function UnmarkAsFavourite(fileId:any){
     
     
      try {
       
        const data=await sp.web.lists.getByTitle(listToUpdate).items
        .filter(`FileUID eq '${fileId}' and CurrentUser eq '${currentUserEmailRef.current}' and MyRequest eq 0 `)();
   
        console.log("Data",data);
        const isFavourite=false;
   
        if (data.length > 0) {
          const itemId = data[0].Id;
          console.log("items ID",itemId);
          if(data[0].IsFavourite && data[0].CurrentUser === currentUserEmailRef.current){
              const updatedData=await sp.web.lists.getByTitle(listToUpdate).items.getById(itemId).update({
                IsFavourite:isFavourite
              });
   
              console.log("Updated data",updatedData);
          }else{
            console.log("Can not find item relataed to current user to unmark");
          }
         
       
        } else {
          console.log("No items found with FileUID:",  fileId);
        }
       
      } catch (error) {
        console.error("Error updating the list item:", error);
      }
    }
   
    try {
         
          if ( markAsFavouriteIcon && unMarkAsFavouriteIcon && textElement) {
         
            // Toggle visibility between the two SVGs and text content
            if (markAsFavouriteIcon.style.display === 'none') {
              markAsFavouriteIcon.style.display = 'inline';
              unMarkAsFavouriteIcon.style.display = 'none';
              textElement.textContent = 'Mark as Favourite';
                   
              // Call function to unmark as favourite.
              UnmarkAsFavourite(fileId);
            } else {
              markAsFavouriteIcon.style.display = 'none';
              unMarkAsFavouriteIcon.style.display = 'inline';
              textElement.textContent = 'Unmark as Favourite';
             
              // Call function to mark as favourite.
              markAsFavourite(fileId, siteId);
            }
          }
    } catch (error) {
             console.log("This Error From toggleFavourite Function",error);
    }
   
  }
    // window.unMarkAsFavorite = async (fileId: number, siteId: string, listToUpdate: string) => {
    //   console.log("File Id is ", fileId);
    //   console.log("siteId is ", siteId,);
    //   console.log( "List ", listToUpdate);
   
    //   try {
    //     const list = sp.web.lists.getByTitle(`${listToUpdate}`);
    //     console.log("List", list);
    //     const isFavourite=false;
    //     const items = await list.items.filter(`FileUID eq '${fileId}' and CurrentUser eq '${currentUserEmailRef.current}'`)();
    //     console.log("File Data",items)
    //     if (items.length > 0) {
    //       if (items[0].IsFavourite && items[0].CurrentUser === currentUserEmailRef.current) {
    //         const itemId = items[0].Id;
    //         await list.items.getById(itemId).update({
    //           IsFavourite: isFavourite
    //         });
    //         console.log(`Item with FileUID '${fileId}' updated successfully.`);
    //         // Re-render only the modified list
    //         await myFavorite(null, siteId);
    //       }
       
    //     } else {
    //       console.log(`No item found with FileUID '${fileId}'.`);
    //     }
   
    //   } catch (error) {
    //     console.log("This error is from unMarkAsFavorite function ", error);
    //   }
    // };
  
    // function to toggle between Favourite and UnFavourite
  // @ts-ignore
  window.toggleFavourite=async (fileId,siteId)=> {
   
    console.log("SiteId",siteId)
   
    const favouriteToggle = document.getElementById(`favouriteToggle-${fileId}`);  
    const markAsFavouriteIcon = favouriteToggle?.querySelector('.mark-as-favourite') as HTMLElement;
    const unMarkAsFavouriteIcon = favouriteToggle?.querySelector('.unmark-as-favourite') as HTMLElement;
    const textElement = favouriteToggle?.querySelector('.favourite-text') as HTMLElement;
   
    console.log("current Entity",currentEntity);
    let listToUpdate=`DMS${currentEntity}FileMaster`;
   
    async function markAsFavourite(fileId:any, siteId:any){
         
          const siteContext = await sp.site.openWebById(siteId);
          const folderData = await siteContext.web.getFolderByServerRelativePath(currentfolderpath).files.select("Name", "Length", "ServerRelativeUrl", "UniqueId","MajorVersion","ListItemAllFields/Status","ListItemAllFields/IsDeleted").expand('ListItemAllFields')();
          console.log("folderData",folderData);
   
          const isFavourite=true;
          const payload={
            FileName:"",
            FileUID:fileId,
            FileVersion:"",
            FileSize:"",
            IsFavourite:isFavourite,
            CurrentUser:currentUserEmailRef.current,
            CurrentFolderPath:currentfolderpath,
            DocumentLibraryName:currentDocumentLibrary,
            FolderName:currentFolder,
            SiteName:currentEntity,
            SiteID:siteId,
            Status:"",
            FilePreviewURL: ""
          }
   
          folderData.forEach(async (file:any)=>{
            if(file.UniqueId === fileId){
              payload.FileName=file.Name;
              payload.FileSize=((file.Length as unknown as number) / (1024 * 1024)).toFixed(2);
              payload.FileVersion=String(file.MajorVersion)
              payload.Status=file.ListItemAllFields.Status 
              const encodedFilePath = encodeURIComponent(file.ServerRelativeUrl);
              const parentFolder = file.ServerRelativeUrl.substring(0, file.ServerRelativeUrl.lastIndexOf('/'));
              const siteUrl = window.location.origin;
              const previewUrl = `${siteUrl}/sites/AlRostmani/${currentEntity}/${currentDocumentLibrary}/Forms/AllItems.aspx?id=${encodedFilePath}&parent=${encodeURIComponent(parentFolder)}`;
              // const previewUrl = `${siteUrl}/sites/SPFXDemo/${currentEntity}/${currentDocumentLibrary}/Forms/AllItems.aspx?id=${encodedFilePath}&parent=${encodeURIComponent(parentFolder)}`;
              console.log("previewUrl",previewUrl);
 
              payload.FilePreviewURL=previewUrl               
            }
          })
          console.log(payload);
   
          // Get the list by name
          const list = sp.web.lists.getByTitle(listToUpdate);
   
          const data=await sp.web.lists.getByTitle(listToUpdate).items
          .filter(`FileUID eq '${fileId}' and CurrentUser eq '${currentUserEmailRef.current}' and MyRequest eq 0`)();
          console.log("Data",data);
   
          // Add the new item to the list
          if(data.length>0){
            const itemId = data[0].Id;
            console.log("items ID",itemId);
            if(!data[0].IsFavourite && currentUserEmailRef.current === data[0].CurrentUser){
           
                const updatedData=await sp.web.lists.getByTitle(listToUpdate).items.getById(itemId).update({
                  IsFavourite:true
                });
                console.log("Updated data",updatedData)
          }
   
          }else{
              const addedItem = await list.items.add(payload);
              console.log("New item added successfully:", addedItem);
          }
         
    }
   
   
    async function UnmarkAsFavourite(fileId:any){
     
     
      try {
       
        const data=await sp.web.lists.getByTitle(listToUpdate).items
        .filter(`FileUID eq '${fileId}' and CurrentUser eq '${currentUserEmailRef.current}' and MyRequest eq 0 `)();
   
        console.log("Data",data);
        const isFavourite=false;
   
        if (data.length > 0) {
          const itemId = data[0].Id;
          console.log("items ID",itemId);
          if(data[0].IsFavourite && data[0].CurrentUser === currentUserEmailRef.current){
              const updatedData=await sp.web.lists.getByTitle(listToUpdate).items.getById(itemId).update({
                IsFavourite:isFavourite
              });
   
              console.log("Updated data",updatedData);
          }else{
            console.log("Can not find item relataed to current user to unmark");
          }
         
       
        } else {
          console.log("No items found with FileUID:",  fileId);
        }
       
      } catch (error) {
        console.error("Error updating the list item:", error);
      }
    }
   
    try {
         
          if ( markAsFavouriteIcon && unMarkAsFavouriteIcon && textElement) {
         
            // Toggle visibility between the two SVGs and text content
            if (markAsFavouriteIcon.style.display === 'none') {
              markAsFavouriteIcon.style.display = 'inline';
              unMarkAsFavouriteIcon.style.display = 'none';
              textElement.textContent = 'Mark as Favourite';
                   
              // Call function to unmark as favourite.
              UnmarkAsFavourite(fileId);
            } else {
              markAsFavouriteIcon.style.display = 'none';
              unMarkAsFavouriteIcon.style.display = 'inline';
              textElement.textContent = 'Unmark as Favourite';
             
              // Call function to mark as favourite.
              markAsFavourite(fileId, siteId);
            }
          }
    } catch (error) {
             console.log("This Error From toggleFavourite Function",error);
    }
   
  }
  // window.toggleFavourite=async (fileId,siteId)=> {
   
  //   console.log("SiteId",siteId)
   
  //   const favouriteToggle = document.getElementById(`favouriteToggle-${fileId}`);  
  //   const markAsFavouriteIcon = favouriteToggle?.querySelector('.mark-as-favourite') as HTMLElement;
  //   const unMarkAsFavouriteIcon = favouriteToggle?.querySelector('.unmark-as-favourite') as HTMLElement;
  //   const textElement = favouriteToggle?.querySelector('.favourite-text') as HTMLElement;
   
  //   console.log("current Entity",currentEntity);
  //   let listToUpdate=`DMS${currentEntity}FileMaster`;
   
  //   async function markAsFavourite(fileId:any, siteId:any){
         
  //         const siteContext = await sp.site.openWebById(siteId);
  //         const folderData = await siteContext.web.getFolderByServerRelativePath(currentfolderpath).files
  //         .expand('ListItemAllFields')();
   
  //         const isFavourite=true;
  //         const payload={
  //           FileName:"",
  //           FileUID:fileId,
  //           FileVersion:"Version No.30.0",
  //           FileSize:"",
  //           IsFavourite:isFavourite,
  //           CurrentUser:currentUserEmailRef.current,
  //           CurrentFolderPath:currentfolderpath,
  //           DocumentLibraryName:currentDocumentLibrary,
  //           FolderName:currentFolder
  //         }
   
  //         folderData.forEach(async (file)=>{
  //           if(file.UniqueId === fileId){
  //             payload.FileName=file.Name;
  //             payload.FileSize=((file.Length as unknown as number) / (1024 * 1024)).toFixed(2);                
  //           }
  //         })
  //         console.log(payload);
   
  //         // Get the list by name
  //         const list = sp.web.lists.getByTitle(listToUpdate);
   
  //         const data=await sp.web.lists.getByTitle(listToUpdate).items
  //         .filter(`FileUID eq '${fileId}' and CurrentUser eq '${currentUserEmailRef.current}'`)();
  //         console.log("Data",data);
   
  //         // Add the new item to the list
  //         if(data.length>0){
  //           const itemId = data[0].Id;
  //           console.log("items ID",itemId);
  //           if(!data[0].IsFavourite && currentUserEmailRef.current === data[0].CurrentUser){
           
  //               const updatedData=await sp.web.lists.getByTitle(listToUpdate).items.getById(itemId).update({
  //                 IsFavourite:true
  //               });
  //               console.log("Updated data",updatedData)
  //         }
   
  //         }else{
  //             const addedItem = await list.items.add(payload);
  //             console.log("New item added successfully:", addedItem);
  //         }
         
  //   }
   
   
  //   async function UnmarkAsFavourite(fileId:any){
     
     
  //     try {
       
  //       const data=await sp.web.lists.getByTitle(listToUpdate).items
  //       .filter(`FileUID eq '${fileId}' and CurrentUser eq '${currentUserEmailRef.current}'`)();
   
  //       console.log("Data",data);
  //       const isFavourite=false;
   
  //       if (data.length > 0) {
  //         const itemId = data[0].Id;
  //         console.log("items ID",itemId);
  //         if(data[0].IsFavourite && data[0].CurrentUser === currentUserEmailRef.current){
  //             const updatedData=await sp.web.lists.getByTitle(listToUpdate).items.getById(itemId).update({
  //               IsFavourite:isFavourite
  //             });
   
  //             console.log("Updated data",updatedData);
  //         }else{
  //           console.log("Can not find item relataed to current user to unmark");
  //         }
         
       
  //       } else {
  //         console.log("No items found with FileUID:",  fileId);
  //       }
       
  //     } catch (error) {
  //       console.error("Error updating the list item:", error);
  //     }
  //   }
   
  //   try {
         
  //         if ( markAsFavouriteIcon && unMarkAsFavouriteIcon && textElement) {
         
  //           // Toggle visibility between the two SVGs and text content
  //           if (markAsFavouriteIcon.style.display === 'none') {
  //             markAsFavouriteIcon.style.display = 'inline';
  //             unMarkAsFavouriteIcon.style.display = 'none';
  //             textElement.textContent = 'Mark as Favourite';
                   
  //             // Call function to unmark as favourite.
  //             UnmarkAsFavourite(fileId);
  //           } else {
  //             markAsFavouriteIcon.style.display = 'none';
  //             unMarkAsFavouriteIcon.style.display = 'inline';
  //             textElement.textContent = 'Unmark as Favourite';
             
  //             // Call function to mark as favourite.
  //             markAsFavourite(fileId, siteId);
  //           }
  //         }
  //   } catch (error) {
  //            console.log("This Error From toggleFavourite Function",error);
  //   }
   
  // }
   
  // This function give the File Icon
  // const getFileIcon = (fileName:any) => {
         
     
  //   const fileExtension = fileName.split(".").pop().toLowerCase();
  //   let fileIcon;
  //   switch (fileExtension) {
  //     case "doc":
  //     case "docx":
  //       fileIcon = require("../assets/DOC.png");
  //       break;
  //     case "txt":
  //       fileIcon = require("../assets/TXT.png");
  //       break;
  //     case "pdf":
  //       fileIcon = require("../assets/PDF.png");
  //       break;
  //     case "xls":
  //     case "xlsx":
  //       fileIcon = require("../assets/XLS.png");
  //       break;
  //     case "zip":
  //       fileIcon = require("../assets/ZIP.png");
  //       break;
  //     default:
  //       fileIcon = require("../assets/DOC.png"); // Default icon if no match
  //       break;
  //   }
  //   return {fileIcon,fileExtension};
  // };
  
    //My request Files
//     const myRequest = async (event:React.MouseEvent<HTMLButtonElement>=null, siteIdToUpdate: string = null,    searchText:any=null ) => {
//       const wait2 = document.getElementById('hidegidvewlistviewbutton')
//       wait2.classList.remove('hidemydatacards')
      
//       setTimeout(() => {
//         // alert("set timer")
//         setlistorgriddata('');  // Update state to '' after a delay
   
//         console.log(listorgriddata, "list")
//       }, 100);
      
//       const wait = document.getElementById('files-container')
//       wait.classList.remove('hidemydatacards')
//       setShowMyrequButtons(true)
//       setShowMyfavButtons(false)
//       setMyreqormyfav('Myrequest')
//       // setlistorgriddata('')
//       const hidegidvewlistviewbutton=document.getElementById("hidegidvewlistviewbutton")
//       if (hidegidvewlistviewbutton) {
//         console.log("enter here .....................")
//         hidegidvewlistviewbutton.style.display = 'flex'
       
//       }
//       const hidegidvewlistviewbutton2=document.getElementById("hidegidvewlistviewbutton2")
//       if (hidegidvewlistviewbutton2) {
//         console.log("enter here .....................")
//         hidegidvewlistviewbutton2.style.display = 'none'
       
//       }
  
  
//       // console.log(listorgriddata , "listorgriddata")
//       console.log("searchInput",searchText);
//       console.log("siteIdToUpdate",siteIdToUpdate);
  
//       if(event){
//         event.preventDefault();
//         event.stopPropagation();
//       }
      
  
  
  
  
//       // call this function onClick of the myRequest
//       // handleShowContent(event)
//       const createFileButton2 = document.getElementById('createFileButton2')
//       const createFileButton = document.getElementById('createFileButton')
  
//       if(createFileButton2){
//       createFileButton2.style.display = 'none'
//       }
//       if(createFileButton){
//       createFileButton.style.display = 'none'
//       }
       
  
      
//       if(event) {
//         event.preventDefault();
//         event.stopPropagation();
//       }
    
//       // console.log("myFavorite Function is called");
    
//       const container = document.getElementById("files-container");
//       if(siteIdToUpdate ===  null){
//           container.innerHTML="";
//           // console.log("siteToUpdate")
//       }
     
//       // console.log("beforeFetchItems");
//       // Fetch the list of active lists
//       const FilesItems = await sp.web.lists
//         .getByTitle("MasterSiteURL")
//         .items.select("Title", "SiteID", "FileMasterList", "Active")
//         .filter(`Active eq 'Yes'`)();
    
//        console.log("Active Sites List Names", FilesItems);
    
//       FilesItems.forEach(async (fileItem) => {
//         if (fileItem.FileMasterList !== null) {
    
//           // console.log("FilesItesms");
//           // Skip rendering if we're updating only a specific list
//           if (siteIdToUpdate && fileItem.SiteID !== siteIdToUpdate) {
//             return;
//           }
    
//           // console.log("SiteId", fileItem.SiteID);
    
//           const filesData = await sp.web.lists
//           .getByTitle(`${fileItem.FileMasterList}`)
//           .items.select("ID" , "FileName", "FileUID", "FileSize", "FileVersion" ,"Status" , "SiteID","CurrentFolderPath","DocumentLibraryName","SiteName","FilePreviewURL")
//           .filter(
//             `CurrentUser eq '${currentUserEmailRef.current}'`
//           )();
//           // console.log("My reaquest Called");
  
//           // console.log("enter in the myRequest------")
//           console.log("FilesData my req",filesData)
//         // route to different-2 sideBar
  
//         // start
//         routeToDiffSideBar="myRequest";
//         let filteredFileData=[];
//         if(searchText !== null){
//               filteredFileData=filesData.filter((file: any) => file.FileName.toLowerCase().includes(searchText.value.toLowerCase()))
//               // console.log("this is filtered data",filteredFileData)
//         }else{
//           filteredFileData=filesData;
//         }
//         // end 
  
//         // change the array
//         filteredFileData.forEach((file) => {
//         //  console.log(file.ID , "file.odata.id ")
//          // Function to truncate text
//     const truncateText = (text: string, maxLength: number) => {
//       return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
//     };
//         console.log(file, "here is our file")
//         const card = document.createElement("div");
        
//         // console.log("searchArray",searchArray);
//         let fileIcon;
//         const fileExtension = file.FileName.split(".").pop().toLowerCase(); // Get the file extension
//         switch (fileExtension) {
//           case "doc":
//           case "docx":
//             fileIcon = Docicon;
//             break;
//           case "txt":
//             fileIcon = Txticon;
//             break;
//           case "pdf":
//             fileIcon = Pdficon;
//             break;
//           case "xls":
//           case "xlsx":
//             fileIcon = Xlsicon;
//             break;
//           case "zip":
//             fileIcon = Zipicon;
//             break;
//           default:
//             fileIcon = Docicon; // Default icon if no match
//             break;
//         }
    
//         card.className = "card";
//         card.innerHTML = `  
//             <div class="IMGContainer">
             
//           <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
  
//            </div>     
//                    <div class="CardTextContainer">
//           <p class="p1st">${truncateText(file.FileName, 10)}</p>
//           <p class="p2nd"></p>
//           <p class="p3rd">${((file.FileSize as unknown as number) / (1024 * 1024)).toFixed(2)} MB</p>
//           <p class="filestatus"> ${file.Status}  </p>
//           <div class="three-dots" onclick="toggleMenu2('${file.FileUID}','${file.SiteID}','${file.ID}' , '${file.FileMasterList}', '${file.FilePreviewURL}')  ">
//               <span>...</span>
//           </div>
//            </div>
//         `;
       

//         // from here i want this code to be execute only when window.toggleMenu2 is completed 
//         const menu = document.createElement("div");
//         // console.log(menu , "menu is here")
//         menu.id = `menu-${file.FileUID}`;
//         menu.className = "popup-menu";
//         const showaudit = <FontAwesomeIcon style={{color: "black"}} icon={faListSquares}/>
// // Reset menu HTML
// menu.innerHTML = '';

// // Check the user role

//     console.log("enter in Admin Pop up");
//     menu.innerHTML = `
//       <ul>
//         <li onclick="confirmDeleteFile('${file.FileUID}','${file.SiteID}','${fileItem.FileMasterList}')">
//           <img src=${deleteIcon} alt="Delete"/> Delete
//         </li>
//         <li onclick="auditHistory('${file.FileUID}', '${file.SiteID}','${file.DocumentLibraryName}','${file.SiteName}')">
//           <img src=${editIcon} alt="Edit"/> Audit History
//         </li>
//      <li onclick="shareFile('${file.FileUID}', '${file.SiteID}','${file.CurrentFolderPath}','${file.FileName}','MyRequest','${file.FileVersion}','${file.FileSize}','${file.Status}','${file.FilePreviewURL}','${file.DocumentLibraryName}')">
//           <img src=${ShareFile} alt="Share"/> Share
//         </li>
//         <li onclick="PreviewFile('${file.FileUID}','${file.SiteID}','${file.ID}' , '${file.FileMasterList}', '${file.FilePreviewURL}')">
//           <img src=${viewIcon} alt="Preview File"/> Preview File
//         </li>
//         <li onclick="Download('${file.FileUID}','${file.SiteID}','${file.ID}' , '${file.FileMasterList}', '${file.FilePreviewURL}')">
//           <img src=${downloadicon} alt="Download File"/> Download File
//         </li>
//       </ul>
//     `;


// // Append menu to card
// card.appendChild(menu);
    
//         // Change the background color and text color based on FileStatus
//         const fileStatusElement = card.querySelector(".filestatus") as HTMLElement;
//         switch (file.Status) {
//           case "Approved":
//             fileStatusElement.style.backgroundColor = "#b5e7d3";
//             fileStatusElement.style.color = "#008751";
//             break;
//           case "Rejected":
//             fileStatusElement.style.backgroundColor = "rgba(241, 85, 108, 0.1)";
//             fileStatusElement.style.color = "#f1556c";
//             break;
//           case "Rework":
//             fileStatusElement.style.backgroundColor = "#ffecc4";
//             fileStatusElement.style.color = "rgba(247, 184, 75)";
//             break;
//             case "Pending":
//               fileStatusElement.style.backgroundColor = "rgb(91 156 187 / 25%)";
//               fileStatusElement.style.color = "#000b56";
//               break;
//               default:
//                 fileStatusElement.style.backgroundColor = "gray";
//                 fileStatusElement.style.color = "white";
//                 break;
//         }
    
//         container.appendChild(card);
//           });
//         }
//       });
    
//     };
const myRequest = async (event:React.MouseEvent<HTMLButtonElement>=null, siteIdToUpdate: string = null,    searchText:any=null ) => {
        // New code to hide the create file and folder button start
      // clean Url start
      if(!cleanUrlInMyRequest){
        const newUrl = `${window.location.origin}${window.location.pathname}`;
        window.history.pushState(null, '', newUrl)
      }
      cleanUrlInMyRequest=false;
      // end
      if(createFileButton2){
        createFileButton2.style.display = 'none'
        }
        if(createFileButton){
        createFileButton.style.display = 'none'
        }
      //End 
      
  setTimeout(() => {
    // alert("set timer")
    setlistorgriddata('');  // Update state to '' after a delay

    console.log(listorgriddata, "list")
  }, 100);
  
  const wait = document.getElementById('files-container')
  wait.classList.remove('hidemydatacards')
  setShowMyrequButtons(true)
  setShowMyfavButtons(false)
  setMyreqormyfav('Myrequest')
  // setlistorgriddata('')
  const hidegidvewlistviewbutton=document.getElementById("hidegidvewlistviewbutton")
  if (hidegidvewlistviewbutton) {
    console.log("enter here .....................")
    hidegidvewlistviewbutton.style.display = 'flex'
   
  }
  const hidegidvewlistviewbutton2=document.getElementById("hidegidvewlistviewbutton2")
  if (hidegidvewlistviewbutton2) {
    console.log("enter here .....................")
    hidegidvewlistviewbutton2.style.display = 'none'
   
  }


  // console.log(listorgriddata , "listorgriddata")
  console.log("searchInput",searchText);
  console.log("siteIdToUpdate",siteIdToUpdate);

  if(event){
    event.preventDefault();
    event.stopPropagation();
  }
  




  // call this function onClick of the myRequest
  // handleShowContent(event)
  

  if(createFileButton2){
  createFileButton2.style.display = 'none'
  }
  if(createFileButton){
  createFileButton.style.display = 'none'
  }
   

  
  if(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // console.log("myFavorite Function is called");

  const container = document.getElementById("files-container");
  if(siteIdToUpdate ===  null){
      container.innerHTML="";
      // console.log("siteToUpdate")
  }
 
  // console.log("beforeFetchItems");
  // Fetch the list of active entity
  const FilesItems = await sp.web.lists
    .getByTitle("MasterSiteURL")
    .items.select("Title", "SiteID", "FileMasterList", "Active")
    .filter(`Active eq 'Yes'`)();

  // console.log("Active Sites List Names", FilesItems);

  FilesItems.forEach(async (fileItem, index) => {
    if (fileItem.FileMasterList !== null) {

      // console.log("FilesItesms");
      // Skip rendering if we're updating only a specific list
      if (siteIdToUpdate && fileItem.SiteID !== siteIdToUpdate) {
        return;
      }

      // console.log("SiteId", fileItem.SiteID);
      console.log("fileItem.FileMasterList",fileItem.FileMasterList);
      // const filesData = await sp.web.lists
      //   .getByTitle(`${fileItem.FileMasterList}`)
      //   .items.select("ID" , "FileName", "FileUID", "FileSize", "FileVersion" ,"Status" , "SiteID","CurrentFolderPath","DocumentLibraryName","SiteName","FilePreviewURL","IsDeleted")
      //   .filter(
      //     `CurrentUser eq '${currentUserEmailRef.current}'`
      //   )();
      const filesData = await sp.web.lists
            .getByTitle(`${fileItem.FileMasterList}`)
            .items.select("ID" , "FileName", "FileUID", "FileSize", "FileVersion" ,"Status" , "SiteID","CurrentFolderPath","DocumentLibraryName","SiteName","FilePreviewURL","IsDeleted","MyRequest").filter(
              `CurrentUser eq '${currentUserEmailRef.current}' and MyRequest eq 1`
            ).orderBy("Modified", false)();
      console.log("My reaquest Called");

      // console.log("enter in the myRequest------")
      console.log(fileItem.FileMasterList,"- FilesData",filesData)
    // route to different-2 sideBar

    let combineArray:any[]=[];
    // start
    routeToDiffSideBar="myRequest";
    let filteredFileData=[];
    if(searchText !== null){
          filteredFileData=filesData.filter((file: any) => file?.FileName?.toLowerCase().includes(searchText?.value?.toLowerCase()))
          // console.log("this is filtered data",filteredFileData)
             // New Code to show pop up when no match found start
             combineArray=[...combineArray, ...filteredFileData]
             if(combineArray.length === 0 && searchText !== null && FilesItems.length === index+1){
               console.log("combineArray",combineArray);
               fileNotFound(`No files match ${searchText.value}`);
             }
             // End
             // console.log("Index",index);
    }else{
      filteredFileData=filesData;
    }
    // end 

    // change the array
    filteredFileData.forEach((file) => {
    //  console.log(file.ID , "file.odata.id ")
    if(file.IsDeleted === null){
      const card = document.createElement("div");
    
      // console.log("searchArray",searchArray);
      let fileIcon;
      const fileExtension = file.FileName?.split(".").pop().toLowerCase(); // Get the file extension
      switch (fileExtension) {
        case "doc":
        case "docx":
          fileIcon = Docicon;
          break;
        case "txt":
          fileIcon = Txticon;
          break;
        case "pdf":
          fileIcon = Pdficon;
          break;
        case "xls":
        case "xlsx":
          fileIcon = Xlsicon;
          break;
        case "zip":
          fileIcon = Zipicon;
          break;
        default:
          fileIcon = Docicon; // Default icon if no match
          break;
      }
  
      card.className = "card";
      card.innerHTML = ` 
      <div class="IMGContainer">        
        <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
      </div>    
           <div class="CardTextContainer">
        <p class="p1st">${file.FileName}</p>
        <p class="p2nd"></p>
        <p class="p3rd">${file.FileSize}</p>
        <p class="filestatus"> ${file.Status}  </p>
        <div class="three-dots" onclick="toggleMenu2('${file.FileUID}','${fileItem.SiteID}','${file.ID}' , '${fileItem.FileMasterList}')  ">
            <span>...</span>
        </div>
            </div>
      `;
  
      const menu = document.createElement("div");
      // console.log(menu , "menu is here")
      menu.id = `menu-${file.FileUID}`;
      menu.className = "popup-menu";
      const showaudit = <FontAwesomeIcon style={{color: "black"}} icon={faListSquares}/>
      menu.innerHTML = `
       <ul>
      <li onclick="confirmDeleteFile('${file.FileUID}','${file.SiteID}','${false}','${fileItem.FileMasterList}')">
        <img src=${deleteIcon} alt="Delete"/> Delete
      </li>
      <li onclick="auditHistory('${file.FileUID}', '${file.SiteID}','${file?.DocumentLibraryName}','${file?.SiteName}')">
            <img src=${editIcon} alt="Edit"/>
                        Audit History
      </li>
      <li onclick="shareFile('${file.FileUID}', '${file.SiteID}','${file.CurrentFolderPath}','${file.FileName}','MyRequest','${file.FileVersion}','${file.FileSize}','${file.Status}','${file.FilePreviewURL}','${file.DocumentLibraryName}')">
        <img src=${ShareFile} alt="Share"/> Share
      </li>
       <li onclick="PreviewFile('${file.FileUID}','${file.SiteID}','${file.ID}' , '${file.FileMasterList}', '${file.FilePreviewURL}')">
           <img src=${viewIcon} alt="Preview File"/> Preview File
         </li>
         <li onclick="Download('${file.FileUID}','${file.SiteID}','${file.ID}' , '${file.FileMasterList}', '${file.FilePreviewURL}')">
           <img src=${downloadicon} alt="Download File"/> Download File
         </li>
      ${file.Status === "Rework" ? `
        <li onclick="Download('${file.FileUID}','${file.SiteID}','${file.ID}' , '${file.FileMasterList}', '${file.FilePreviewURL}')">
            <img src=${editIcon} alt="Edit File"/> Edit File
        </li>` : ''}
    </ul>
      `;
      

      
      card.appendChild(menu);
      // Change the background color and text color based on FileStatus
      const fileStatusElement = card.querySelector(".filestatus") as HTMLElement;
      switch (file.Status) {
        case "Approved":
          fileStatusElement.style.backgroundColor = "#b5e7d3";
          fileStatusElement.style.color = "#008751";
          break;
        case "Rejected":
          fileStatusElement.style.backgroundColor = "rgba(241, 85, 108, 0.1)";
          fileStatusElement.style.color = "#f1556c";
          break;
        case "Rework":
          fileStatusElement.style.backgroundColor = "#ffecc4";
          fileStatusElement.style.color = "rgba(247, 184, 75)";
          break;
          case "Pending":
            fileStatusElement.style.backgroundColor = "rgb(91 156 187 / 25%)";
            fileStatusElement.style.color = "#000b56";
            break;
            default:
              fileStatusElement.style.backgroundColor = "gray";
              fileStatusElement.style.color = "white";
              break;
      }
      
      container.appendChild(card);
      // check file status if approved hide the delete button
      const menu1 = document.getElementById(`menu-${file.FileUID}`);
      // console.log("menu1",menu1);
      if(file.Status === "Approved" || file.Status === null){
        const firstItem = menu1.children[0]?.children[0] as HTMLElement;
        if (firstItem && firstItem.style.display !== "none") {
            firstItem.style.display = "none";
        }
      }
    }
  //   const card = document.createElement("div");
    
  //   // console.log("searchArray",searchArray);
  //   let fileIcon;
  //   const fileExtension = file.FileName?.split(".").pop().toLowerCase(); // Get the file extension
  //   switch (fileExtension) {
  //     case "doc":
  //     case "docx":
  //       fileIcon = Docicon;
  //       break;
  //     case "txt":
  //       fileIcon = Txticon;
  //       break;
  //     case "pdf":
  //       fileIcon = Pdficon;
  //       break;
  //     case "xls":
  //     case "xlsx":
  //       fileIcon = Xlsicon;
  //       break;
  //     case "zip":
  //       fileIcon = Zipicon;
  //       break;
  //     default:
  //       fileIcon = Docicon; // Default icon if no match
  //       break;
  //   }

  //   card.className = "card";
  //   card.innerHTML = `         
  //     <img class="filextension" src=${fileIcon} alt="${fileExtension} icon"/>
  //     <p class="p1st">${file.FileName}</p>
  //     <p class="p2nd"></p>
  //     <p class="p3rd">${file.FileSize}</p>
  //     <p class="filestatus"> ${file.Status}  </p>
  //     <div class="three-dots" onclick="toggleMenu2('${file.FileUID}','${fileItem.SiteID}','${file.ID}' , '${fileItem.FileMasterList}')  ">
  //         <span>...</span>
  //     </div>
  //   `;

  //   const menu = document.createElement("div");
  //   // console.log(menu , "menu is here")
  //   menu.id = `menu-${file.FileUID}`;
  //   menu.className = "popup-menu";
  //   const showaudit = <FontAwesomeIcon style={{color: "black"}} icon={faListSquares}/>
  //   menu.innerHTML = `
  //    <ul>
  //   <li onclick="confirmDeleteFile('${file.FileUID}','${file.SiteID}','${false}','${fileItem.FileMasterList}')">
  //     <img src=${deleteIcon} alt="Delete"/> Delete
  //   </li>
  //   <li onclick="auditHistory('${file.FileUID}', '${file.SiteID}','${file?.DocumentLibraryName}','${file?.SiteName}')">
  //         <img src=${editIcon} alt="Edit"/>
  //                     Audit History
  //   </li>
  //   <li onclick="shareFile('${file.FileUID}', '${file.SiteID}','${file.CurrentFolderPath}','${file.FileName}','MyRequest','${file.FileVersion}','${file.FileSize}','${file.Status}','${file.FilePreviewURL}','${file.DocumentLibraryName}')">
  //     <img src=${ShareFile} alt="Share"/> Share
  //   </li>
  // </ul>
  //   `;
    

    
  //   card.appendChild(menu);
  //   // Change the background color and text color based on FileStatus
  //   const fileStatusElement = card.querySelector(".filestatus") as HTMLElement;
  //   switch (file.Status) {
  //     case "Approved":
  //       fileStatusElement.style.backgroundColor = "#b5e7d3";
  //       fileStatusElement.style.color = "#008751";
  //       break;
  //     case "Rejected":
  //       fileStatusElement.style.backgroundColor = "rgba(241, 85, 108, 0.1)";
  //       fileStatusElement.style.color = "#f1556c";
  //       break;
  //     case "Rework":
  //       fileStatusElement.style.backgroundColor = "#ffecc4";
  //       fileStatusElement.style.color = "rgba(247, 184, 75)";
  //       break;
  //       case "Pending":
  //         fileStatusElement.style.backgroundColor = "rgb(91 156 187 / 25%)";
  //         fileStatusElement.style.color = "#000b56";
  //         break;
  //         default:
  //           fileStatusElement.style.backgroundColor = "gray";
  //           fileStatusElement.style.color = "white";
  //           break;
  //   }
    
  //   container.appendChild(card);
  //   // check file status if approved hide the delete button
  //   const menu1 = document.getElementById(`menu-${file.FileUID}`);
  //   // console.log("menu1",menu1);
  //   if(file.Status === "Approved" || file.Status === null){
  //     const firstItem = menu1.children[0]?.children[0] as HTMLElement;
  //     if (firstItem && firstItem.style.display !== "none") {
  //         firstItem.style.display = "none";
  //     }
  //   }
      });
    }
  });

};
      // Show Error Message on file not Found start
  const fileNotFound=(fileName:any)=>{
    Swal.fire(`No results found`,`${fileName}`, "warning");
  }
  // end
    const [activeComponent, setActiveComponent] = useState<string | 'MyRequest'>('');
    const [listorgriddata, setlistorgriddata] = useState<string>('');
    const handleButtonClickShow = (componentName:any) => {
      setActiveComponent(componentName); // Set the active component based on the button clicked
    };
    const handleReturnToMain = () => {
      setActiveComponent(''); // Reset to show the main component
    };
    
  
    const MyrequestshowListView = (componentName:any)=>{
      const wait = document.getElementById('files-container')
      wait.classList.add('hidemydatacards')
      setlistorgriddata('showListView');
    }
  
    // side text content based on click 
    // Handle button click and show the text of the clicked button
    const [selectedText,setSelectedText]=useState<string | null>(null);
    const [dynamicContent, setDynamicContent] = useState<string | null>(null);
     // Function to update the breadcrumb navigation
     const updateBreadcrumb = (path:any) => {
        console.log(path, "path")
      // For toggle the breadcrumb and selectedTextForSideBar
      const selectedTextDiv=document.getElementById('selectedText');
      const breadcrumbElement=document.getElementById("breadcrumb");
  
      if(breadcrumbElement){
        // breadcrumbElement.style.position = "absolute"
        breadcrumbElement.style.width = ""      // Change width  by Amjad
        breadcrumbElement.style.top = "115px"
        breadcrumbElement.style.display='block';
      }
   if(selectedTextDiv){
    selectedTextDiv.style.display='none';
   }
     
   
   
      if (breadcrumbElement) {
        breadcrumbElement.textContent = path;
      }
    };
   // Function to handle navigation and update breadcrumb
   const handleNavigation = (title:string,Devision:string  , Department:string ,  docLibName:string=null, folderName:string=null) => {
    let path = title;
    if(Devision) {
      path += ` > ${Devision}`;
    }
    if(Department) {
      path += ` > ${Department}`;
    }
    if (docLibName) {
      path += ` > ${docLibName}`;
    }
  
    if (folderName) {
      path += ` > ${folderName}`;
    }
  
    updateBreadcrumb(path);
  };
    const handleShowContent = (event: React.MouseEvent<HTMLButtonElement>) => {
      // console.log("enter here")
      event.preventDefault();
     
      //toggle the breadcrumb and selectedText For SideBar
      const selectedTextDiv=document.getElementById('selectedText');
      const breadcrumbElement=document.getElementById("breadcrumb");
      breadcrumbElement.style.display='none';
      selectedTextDiv.style.display='block';
   
   
      // Find the button that was clicked
      const button = event.currentTarget;
   
     
      const spanElement = button.querySelector('.sidebarText');
      const text = spanElement?.textContent;
      
      if (text) {
        setSelectedText(text);
   
        // Update dynamic content based on the button clicked
        switch (text) {
          case 'My Request':
            setDynamicContent('Mentioned below are the documents submitted by logged in user.');
            break;
          case 'My Favourite':
            setDynamicContent('All the files and folder which is marked as Favourite.');
            break;
          case 'My Folder':
            setDynamicContent('All the folder Created by me.');
            break;
          case 'Share with Other':
            setDynamicContent('My files shared with other users.');
            break;
          case 'Share with me':
            setDynamicContent('File upload by other team members and shared with me.');
            break;
          case 'Recycle Bin':
            setDynamicContent('below are the documents Deleted by logged in use.');
            break;
          default:
            setDynamicContent(null);
        }
      }
  };
  
  const search = document.getElementById('searchinput')
   if(search){search.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();  // Prevent default behavior
    }
  })};

  // // Manage Folder WorkFlow Action
  window.manageWorkflow=async(DocumentLibraryName:string,SiteTilte:string, SiteID:string)=>{
    setShowWorkflow(true)
    console.log("enter in workflow")
    // const workflowdiv= document.getElementById('workflowdiv')
    // if(workflowdiv){
    //   workflowdiv.classList.remove('workflowdivhide')
    //   alert(workflowdiv.classList)
    //   workflowdiv.classList.add('workflowdiv')
    // }
    // setshowworkflowdiv("true")

    // setshowworkflowdiv(true)
    // console.log("Inside manageWorkFlow");
  
    propsForManageWorkFlow.SiteTitle=SiteTilte;
    propsForManageWorkFlow.DocumentLibraryName=DocumentLibraryName;
    propsForManageWorkFlow.SiteID=SiteID;
    // handleButtonClickShow("manageWorkFlow");
 
  }

   //Manage Folder Permission Action
   window.managePermission=(documentLibraryName:string,SiteTilte:string,SiteID:string, folderName:any ,folderPath:any )=>{
    setShowfolderpermission(true)
    // console.log(message);
    console.log("documentLibraryName",documentLibraryName)
    console.log("SiteName",SiteTilte);
    console.log("siteId",SiteID);
    console.log("folderName",folderName);
    console.log("folderPath",folderPath);
 
    managePermissionProps.DocumentLibraryName=documentLibraryName;
    managePermissionProps.SiteTitle=SiteTilte;
    managePermissionProps.SiteID=SiteID;
    managePermissionProps.FolderName=folderName;
    managePermissionProps.FolderPath=folderPath;
    //  handleButtonClickShow("managePermission");
    
    // handleButtonClickShow("managePermission");
 
  }

  // Edit File
  window.editFile = async (siteName: string, documentLibraryName:string ) => {
    console.log("Inside the editFile");

    // Fetch the existing columns and types from the list
    const existingColumns = await sp.web.lists.getByTitle("DMSPreviewFormMaster").items.select("ColumnName", "ColumnType","ID").filter(`SiteName eq '${siteName}' and DocumentLibraryName eq '${documentLibraryName}' and IsDocumentLibrary eq 0`)();

    console.log("existingColumns",existingColumns);

    // Create the popup container dynamically
    const popupContainer = document.createElement("div");
    popupContainer.className = "edit-popup";

    // Append to body
    document.body.appendChild(popupContainer);

    // Create close button
    const closeButton = document.createElement("span");
    closeButton.innerHTML = 'x';
    closeButton.className = 'close-button';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '24px';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '15px';

    // Append close button to popup
    popupContainer.appendChild(closeButton);


    // Add form elements for each existing column
    const formContent = document.createElement("div");
    formContent.innerHTML = existingColumns.map((col) => `
      <div class="form-group">
        <div class="col-md-5">
          <label>Field Name</label>
          <input type="text" class="form-control" value="${col.ColumnName}" disabled />
        </div>
        <div class="col-md-5">
          <label>Field Type</label>
          <input type="text" class="form-control" value="${col.ColumnType}" disabled />
        </div>
      </div>
    `).join('');


    // Add button for adding new fields
    const addFieldButton = document.createElement("a");
    addFieldButton.innerHTML = `
      <img class="bi bi-plus" src="${require("../assets/plus.png")}" alt="add" style="width: 50px; height: 50px;" />
    `;

    // Append the content to the popup
    popupContainer.appendChild(formContent);
    popupContainer.appendChild(addFieldButton);

    // Add event listener for "+" button to add new editable fields
    addFieldButton.addEventListener('click', () => {
      const newFieldHTML = `
        <div class="form-group row">
          <div class="col-md-5">
            <label>Field Name</label>
            <input type="text" class="form-control" placeholder="Enter new field name" />
          </div>
          <div class="col-md-5">
            <label>Field Type</label>
            <select class="form-control">
              <option value="" disabled selected>Select Type</option>
              <option value="Single Line of Text">Single Line of Text</option>
              <option value="Mulitple Line of Text">Multiple Line of Text</option>
              <option value="Yes or No">Yes or No</option>
              <option value="Date & Time">Date & Time</option>
              <option value="Number">Number</option>
            </select>
          </div>
          <div class="col-md-2">
            <img class="delete-column"  src="${require("../assets/delete.png")}" alt="add" style="width: 40px; margin-top:25px; cursor:pointer;" />
          </div>
        </div>
      `;
      formContent.insertAdjacentHTML('beforeend', newFieldHTML);
    });

    // Add save button
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    popupContainer.appendChild(saveButton);

    saveButton.addEventListener('click', () => {
      debugger
       // Collect data from newly added fields
       console.log(formContent , "formContent")
      const newFields = Array.from(formContent.querySelectorAll('.form-group.row')).map((group) => {
        console.log(group , "group")
        const fieldNameInput = (group.querySelector('input[type="text"]') as HTMLInputElement);
        const fieldTypeSelect = (group.querySelector('select') as HTMLSelectElement);
       
        return {
            columnName: fieldNameInput.value,
            columnType: fieldTypeSelect.value
        };
    });

    console.log("New Fields:", newFields);

    try {
      const payloadForPreviewFormMaster={
        SiteName:siteName,
        DocumentLibraryName:documentLibraryName,
        IsRequired:true,
        AddorRemoveThisColumn:"Add To Library",
        IsModified:true
      }

    // existingColumns.forEach(async(column)=>{
    //       try {
    //           // Deleting the item with the provided ID from the DMSPreviewFormMaster list
    //           await sp.web.lists.getByTitle("DMSPreviewFormMaster").items.getById(column.ID).delete();
    //           console.log(`Item with ID ${column.ID} deleted successfully from list DMSPreviewFormMaster`);
    //       } catch (error) {
    //           console.log(`Error deleting item with ID ${column.ID} from list DMSPreviewFormMaster`, error);
    //       }
    //   });

      newFields.forEach(async(column)=>{
        (payloadForPreviewFormMaster as any).ColumnName=column.columnName.replace(/\s+/g,'');;
        (payloadForPreviewFormMaster as any).ColumnType=column.columnType;
       
        const addedItem = await sp.web.lists.getByTitle("DMSPreviewFormMaster").items.add(payloadForPreviewFormMaster);
        console.log("Item added successfully in the DMSPreviewFormField", addedItem);

      })
    } catch (error) {
      console.log("Error in adding columns in the DMSPreviewFormMaster inside the editFile onclick of the save button",error)
    }

     
    });

// Add event listener to close button
closeButton.addEventListener('click', () => {
      popupContainer.style.display = 'none';
 });

//add event listener to  removing the field
 // Event delegation
  formContent.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("delete-column")) {
        const fieldGroup = target.closest('.form-group.row');
        if (fieldGroup) {
            fieldGroup.remove();
        }
    }
});
};

//  Share File
window.shareFile=async(fileID:string,siteId:string,currentFolderPathForFile:string,fileName:string,flag:string,FileVersion:any,FileSize:any,Status:any,FilePreviewURL:any,DocumentLibraryName:any)=>{
  console.log("Share File called");
  console.log("flag",flag);
  console.log("file Id",fileID);
  console.log("site Id",siteId);
  console.log("FileName",fileName);
  console.log("currentFolderPath",currentFolderPathForFile);

  // Check permission of file when it come from the myrequest start
  const testidsub =await sp.site.openWebById(siteId)  
  
  let filePath=`${currentFolderPathForFile}/${fileName}`;
  console.log("filePath",filePath);
  const fileServerRelativePath = testidsub.web.getFileByServerRelativePath(filePath);
  // Retrieve the list item associated with the file
  const item = await fileServerRelativePath.getItem();
  console.log("items",item);
  // Get current user permissions on the item (file)
  const filePermissions = await item.getCurrentUserEffectivePermissions(); 
  console.log("File permissions:", filePermissions);
  // console.log("file listItems All field",file.ListItemAllFields);

  const hasFullControl = testidsub.web.hasPermissions(filePermissions, PermissionKind.ManageWeb);
  const hasEdit = testidsub.web.hasPermissions(filePermissions, PermissionKind.EditListItems);
  const hasContribute = testidsub.web.hasPermissions(filePermissions, PermissionKind.AddListItems) && testidsub.web.hasPermissions(filePermissions, PermissionKind.EditListItems);
  const hasRead = testidsub.web.hasPermissions(filePermissions, PermissionKind.ViewListItems);
  console.log(hasFullControl , "hasFullControl")
  console.log(hasEdit , "hasEdit")
  console.log(hasContribute , "hasContribute")
  console.log(hasRead , "hasRead")
  let filePermission:string;
  if (hasFullControl) {
    filePermission ="Full Control";
  } else if (hasEdit) {
    filePermission ="Edit";
  } else if (hasContribute) {
    filePermission = "Contribute";
  } else if (hasRead) {
    filePermission = "Read";
  } else {
    filePermission = "No Access";
  }

  console.log("filePermission",filePermission);

  // exreact the Entity from folder path
  const parts = currentFolderPathForFile.split("/");  
  const entity = parts[3]; 
  console.log(entity); 

  const fetchUser=async(entity:any)=>{
    // const [
    //   users,
    //   users1,
    //   users2,
    //   users3,
    //   users4,
    // ] = await Promise.all([
    //   sp.web.siteGroups.getByName(`${entity}_Read`).users(),
    //   sp.web.siteGroups.getByName(`${entity}_Initiator`).users(),
    //   sp.web.siteGroups.getByName(`${entity}_Contribute`).users(),
    //   sp.web.siteGroups.getByName(`${entity}_Admin`).users(),
    //   sp.web.siteGroups.getByName(`${entity}_View`).users(),
    // ]);
    // console.log(users, "users ", users1,users2,users3,users4);
    // const combineArray = [
    //   ...(users || []),
    //   ...(users1 || []),
    //   ...(users2 || []),
    //   ...(users3 || []),
    //   ...(users4 || []),
    // ];

    // const siteContext = await sp.site.openWebById(OthProps.siteID);
    const user0 = await sp.web.siteUsers();
    const combineUsersArray=user0.map((user)=>(
          {
            id:String(user.Id),
            value: user.Title,
            email: user.Email,
          }
    ))
    console.log("Sub site users",combineUsersArray);
      
    // const resultArray=combineUsersArray.map((user) => ( 
    //   {
    //     id:String(user.Id),
    //     value: user.Title,
    //     email: user.Email
    //   }
    // ))
    // console.log("combineArray", combineArray);
    // console.log("resultArray",resultArray)

    return combineUsersArray;
  }

  const users=await fetchUser(entity);
  console.log("UserArray",users);
 

// Check if a popup already exists, if so, remove it before creating a new one
const existingPopup = document.getElementById('share-popup');
if (existingPopup) {
existingPopup.remove();
}

// Dummy data
// const users = [
//   { value: 'Test1', id: '14',email:"User1@officeindia.onmicrosoft.com" },
//   { value: 'Test2', id: '31',email:"User2@officeindia.onmicrosoft.com" },
//   { value: 'Test3', id: '137',email:"User3@officeindia.onmicrosoft.com"},
//   { value: 'Test4', id: '33',email:"User4@officeindia.onmicrosoft.com" },
//   { value: 'Test5', id: '32',email:"User5@officeindia.onmicrosoft.com" },
//   { value: 'Test6', id: '34',email:"User6@officeindia.onmicrosoft.com" },
//   { value: 'Test User1', id: '39',email:"User7@officeindia.onmicrosoft.com" },
//   ];


// Declare selectedUsers with an explicit type, assuming user IDs are of type string for selecting the user for share
let selectedUsers: { id: string; value: string; email:string }[] = [];
// Create the pop-up element
const popup = document.createElement("div");
popup.id = 'share-popup';
popup.className = "share-popup";

// Show permissions options.
let options=''
if(filePermission === "Full Control"){
options=`
    <option value="Full Control">Full Control</option>
    <option value="Contribute">Contribute</option>
    <option value="Edit">Edit</option>
    <option value="Read">Read</option>
`
}else if(filePermission === "Contribute" || filePermission === "Edit"){
options=`
  <option value="Contribute">Contribute</option>
  <option value="Edit">Edit</option>
  <option value="Read">Read</option>
`
}else if(filePermission === "Read"){
options=`
  <option value="Read">Read</option>
` 
}


// Add HTML structure for the pop-up with a dropdown and a close "X" button
popup.innerHTML = `
<div class="share-popup-content">
<div class="share-popup-header">
  <h4>Share</h4>
  <span class="share-close-popup" onClick="hideSharePopUp()">x</span>
</div>
<div class="share-popup-body">
  <div id="share-reactSelect">
      <input type="text" id="userInput" placeholder="Add a Name, Group, or Email" style="
      width: 100%; 
      padding: 10px;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #ccc;
    "/>
    <div id="userDropdown" class="user-dropdown" style="
      display: none;
      position: absolute;
      width: 29.8%;
      max-height: 150px;
      overflow-y: auto;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      z-index: 1000;
    ">
    </div>
  </div>
   <div>
    <select id="permissionSelect" style="
      margin-bottom:10px;
      width: 100%; 
      padding: 10px;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #ccc;
      margin-top: 10px;
    ">
      <option value="" disabled selected>Permission</option>
      ${options}
    </select>
  </div>
  <textarea id="share-message" placeholder="Write a message..." >
  </textarea>
</div>
<div class="share-popup-footer">
  <button id="share-shareFileButton">Share</button>
</div>
</div>
`;

// Append the  popup to the body
document.body.appendChild(popup);

// Get references to the input box and dropdown
const userInput = document.getElementById('userInput') as HTMLInputElement;
const userDropdown = document.getElementById('userDropdown');

// Function to render dropdown options based on user input
function renderDropdown(users: { id: string, value: string,email:string }[]) {
// Clear previous options
userDropdown.innerHTML = ''; 
users.forEach(user => {
const option = document.createElement('div');
option.className = 'dropdown-item';
option.style.padding = '8px';
option.style.cursor = 'pointer';
option.textContent = user.value;
option.onclick = () => selectUser(user);
userDropdown.appendChild(option);
});
}

// Function to show the dropdown when the input is clicked
userInput.addEventListener('focus', () => {
userDropdown.style.display = 'block';

// Display all users initially
renderDropdown(users); 
});

// Filter dropdown based on input value
userInput.addEventListener('input', () => {
const searchValue = userInput.value.toLowerCase();
const filteredUsers= users.filter(user => user.value.toLowerCase().includes(searchValue));
renderDropdown(filteredUsers);
});

// Function to select a user and display it inside the input
function selectUser(user: { id: string, value: string,email:string }) {
console.log("selected user",selectedUsers)
if (!selectedUsers.some(selectedUser => selectedUser.id === user.id)) {

selectedUsers.push(user);

// Create a span for the selected user with a close button
const selectedUserDiv = document.createElement('span');
selectedUserDiv.className = 'selected-user';
selectedUserDiv.style.display = 'inline-block';
selectedUserDiv.style.padding = '2px 6px';
selectedUserDiv.style.backgroundColor = '#e0e0e0';
selectedUserDiv.style.borderRadius = '12px';
selectedUserDiv.style.marginRight = '5px';
selectedUserDiv.style.position = 'relative';

selectedUserDiv.textContent = user.value;

// Create close button for deselecting the user
const closeButton = document.createElement('span');
closeButton.textContent = 'x';
closeButton.style.cursor = 'pointer';
closeButton.style.marginLeft = '5px';
closeButton.onclick = () => deselectUser(user.id, selectedUserDiv);
selectedUserDiv.appendChild(closeButton);

// Append the selected user to the input field
userInput.parentNode!.insertBefore(selectedUserDiv, userInput);
userInput.value = ''; 
}
userDropdown.style.display = 'none'; 
}

// Function to deselect a user
function deselectUser(userId: string, selectedUserDiv: HTMLElement) {
// selectedUsers = selectedUsers.filter(id => id !== userId);
selectedUsers = selectedUsers.filter(selectedUser => selectedUser.id !== userId);
console.log("selected user",selectedUsers);
selectedUserDiv.remove();
}

// Hide the dropdown if clicked outside
document.addEventListener('click', (event) => {
if (!userInput.contains(event.target as Node) && !userDropdown.contains(event.target as Node)) {
userDropdown.style.display = 'none';
}
});

// Capture selected permission
let selectedPermission = "";
document.getElementById('permissionSelect').addEventListener('change', (event) => {
selectedPermission = (event.target as HTMLSelectElement).value;
console.log("Selected Permission:", selectedPermission);
});

// Adding event listener to the "Share" button
document.getElementById('share-shareFileButton').addEventListener('click', async function() {
    console.log("selectedUserArray",selectedUsers);
    console.log("Entity",entity);
    console.log("FileId",fileID);
    console.log("SiteId",siteId);
    console.log("currentFolderPathForFile",currentFolderPathForFile);
    console.log("FileName",fileName);
    console.log("filesize",FileSize);
    console.log("FileVersion",FileVersion);
    console.log("Status",Status);
    console.log("FilePreviewURL",FilePreviewURL);
    console.log("DocumentLibraryName",DocumentLibraryName)
    const filePath=`${currentFolderPathForFile}/${fileName}`;
    console.log("filePath",filePath);
    // Check the Break role on the file start
    const testidsub =await sp.site.openWebById(siteId);
    const file =testidsub.web.getFileByServerRelativePath(filePath);
    const item = await file.getItem();
    const itemData = await item.select("HasUniqueRoleAssignments")();
    const breaKRole=itemData.HasUniqueRoleAssignments;
    console.log("breaKRole",breaKRole);
    if (!breaKRole) {
      // Break role inheritance, keeping current permissions
      await item.breakRoleInheritance(true);
      console.log("Inheritance broken, retaining previous permissions.");
    }

    // end

    // New Code push the data into the DMSShareWithOtherMaster Start
    try {
      const isoDate = new Date().toISOString().slice(0, 19) + 'Z';
      const payloadForDMSShareWithOtherMaster={
        FileName:fileName,
        FileUID:fileID,
        CurrentUser:currentUserEmailRef.current,
        CurrentFolderPath:currentFolderPathForFile,
        SiteName:entity,
        PermissionType:selectedPermission,
        ShareAt:isoDate,
        FileVersion:FileVersion,
        FileSize:FileSize,
        Status:Status,
        FilePreviewURL:FilePreviewURL,
        SiteID:siteId,
        DocumentLibraryName:DocumentLibraryName
      }
      let roleType:number;
      if(selectedPermission === "Full Control"){
        // roleType=5;
        roleType=1073741829;
      }else if(selectedPermission === "Contribute"){
        // roleType=3;
        roleType=1073741827;
      }else if(selectedPermission === "Edit"){
        // roleType=6;
        roleType=1073741830;
      }else if(selectedPermission === "Read"){
        // roleType=2;
        roleType=1073741826;
      }else{
        roleType=0;
      }
      console.log("roletype",roleType);
      selectedUsers.forEach(async(user)=>{
            (payloadForDMSShareWithOtherMaster as any).UserID=user.id;
            (payloadForDMSShareWithOtherMaster as any).ShareWithOthers=user.value;
            (payloadForDMSShareWithOtherMaster as any).ShareWithMe=user.email;
            const newItem = await sp.web.lists.getByTitle(`DMSShareWithOtherMaster`).items.add(payloadForDMSShareWithOtherMaster)
            
            //Add permission to the user in the file 
            const id=Number(user.id)
            console.log("User Id",id,"type",typeof id);
            // const roleDefinitions = await sp.web.roleDefinitions();     
            // const roleDefinition = roleDefinitions.find(rd => rd.RoleTypeKind === roleType); 
            // console.log("roleDefinition",roleDefinition);    
            // if(!roleDefinition) {       
            //   throw new Error(`Role type ${roleType} not found.`);
            // }
            await item.roleAssignments.add(id,roleType);
            console.log(`User ${user.email} added with role type ${selectedPermission},${roleType}.`);
            console.log("Data added successfully in the",newItem);
      })
     
    } catch (error) {
      console.log("Error in adding data to the DMSShareWithOtherMaster",error);
    }
   
    // End


    // required column
    // FileNamex FileUIDx  CurrentUserx CurrentFolderPathx ShareWithOthersx ShareWithMex  SiteNamex       ShareAtx UserIDx PermissionTypex
    // FileVersion FileSize Status FilePreviewURL

    // const listToUpdateWithShareData=`DMS${entity}FileMaster`;
    // console.log("listToUpdateWithShareData",listToUpdateWithShareData);

    // Fetch the item from the list using its ID
    // const item = await sp.web.lists.getByTitle(listToUpdateWithShareData).items.select("FileName","ShareWithOthers","ShareWithMe","FileUID","ID").filter(`FileUID eq '${fileID}' and CurrentUser eq '${currentUserEmailRef.current}'`)();
    // console.log("Items",item)

    // console.log("item",item);

    // let dataArray;
    // let dataArray: Array<{ FirstName: string; LastName?: string; SharedWith: string; SharedAt: string; TimeStamp: number; Permission: string,userId:string }> = [];
          
    // selectedUsers.forEach(async(user)=>{
    
    // const nameParts = user.value.trim().split(" ");
    // const firstName = nameParts[0]; 
    // let lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
    // console.log("firstName",firstName) 
    // console.log("lastName",lastName);
    // if(lastName === ""){
    //   lastName="";
    // }

    // const isoDate = new Date().toISOString().slice(0, 19) + 'Z';
    // const timestamp = Date.now();
    //   // let userObj={
    //   //   FirstName:firstName,
    //   //   LastName:lastName,
    //   //   SharedWith:user.email,
    //   //   SharedAt:isoDate,
    //   //   TimeStamp:timestamp,
    //   //   Permission:selectedPermission,
    //   //   userId:user.id
    //   // }
    //   // dataArray.push(userObj);
    //   // console.log("userObj",userObj);
    // })

    // console.log("dataArray",dataArray);

    

    // if(item[0].ShareWithMe === null && item[0].ShareWithOthers === null){

    //       const dataInTheFormoOfString=JSON.stringify(dataArray);
    //        // Now update specific columns of the item
    //         const updatedItem = await sp.web.lists.getByTitle(listToUpdateWithShareData).items.getById(item[0].ID).update({
    //           ShareWithOthers:dataInTheFormoOfString,
    //           ShareWithMe:dataInTheFormoOfString
    //         });

    //         console.log("Data updated when ShareWithMe and ShareWithOthers are null",updatedItem);
    // }else{
    //    const shareWithOthers =JSON.parse(item[0].ShareWithOthers);
    //    const shareWithMe=JSON.parse(item[0].ShareWithMe);

    //    dataArray.forEach((user)=>{
    //         // apply condition for sharing same file with same user multiple time using id of the user
    //         const alReadySharedUserIndex=shareWithOthers.findIndex((item:any)=>{
    //               return item.userId === user.userId
    //         })
    //         console.log("alReadySharedUser in shareWithOthers",alReadySharedUserIndex);
    //         const alReadySharedUserIndex1=shareWithMe.findIndex((item:any)=>{
    //             return item.userId === user.userId
    //         })
    //         console.log("alReadySharedUser in shareWithMe",alReadySharedUserIndex1);

    //         if(alReadySharedUserIndex !== -1){
    //               shareWithOthers.splice(alReadySharedUserIndex, 1);
    //               shareWithOthers.push(user);
    //               console.log("shareWithOthers",shareWithOthers);
    //         }else{
    //           shareWithOthers.push(user);
    //         }

    //         if(alReadySharedUserIndex1 !== -1){
    //           shareWithMe.splice(alReadySharedUserIndex1, 1);
    //           shareWithMe.push(user);
    //           console.log("shareWithMe",shareWithMe);
    //         }else{
    //           shareWithMe.push(user);
    //         }
    //    })

    //    console.log("shareWithOthers",shareWithOthers);
    //    console.log("shareWithMe",shareWithMe);

    //    const dataInTheFormoOfStringForShareWithMe=JSON.stringify(shareWithMe);
    //    const dataInTheFormoOfStringForShareWithOthers=JSON.stringify(shareWithOthers);
    //    // Now update specific columns of the item
    //    const updatedItem = await sp.web.lists.getByTitle(listToUpdateWithShareData).items.getById(item[0].ID).update({
    //     ShareWithOthers:dataInTheFormoOfStringForShareWithOthers,
    //     ShareWithMe:dataInTheFormoOfStringForShareWithMe
    //   });

    //   console.log("Data updated when ShareWithMe and ShareWithOthers",updatedItem);
    // }

});


}



// hide the share popup
// @ts-ignore
window.hideSharePopUp=()=>{
const popup=document.querySelector('.share-popup');

if(popup){
  popup.remove();
}
}

//Download file popup 
window.Download= async (path:any, siteID: any, docLibName:any,  filemasterlist:any , filepreview:any)=>{
  try {
    // Get the web context for the site
    console.log(siteID, "siteID")
    const siteWeb = await sp.site.openWebById(siteID)
    console.log(path , "path")
    // Fetch the file using its UniqueId (GUID)
    const file = await siteWeb.web.getFileById(path)();

    // Log the file information
    console.log("File details: ", file);

    // Get the file download URL
    // const fileUrl = file.ServerRelativeUrl;

    // Create a link element for the file download
    const link = document.createElement('a');
     link.href = file.ServerRelativeUrl;
     link.download = file.Name; // Optional: Specify the file name for download

    // Programmatically trigger the download
    link.click();
    
  } catch (error) {
    console.error("Error downloading file: ", error);
  }
}
 // show the audit history popup
  // @ts-ignore
  window.auditHistory=async(fileId:string, siteId:string,DocumentLibraryName:string,SiteName:String)=>{
    console.log("Audit History called",fileId,siteId);
    console.log("Audit History called",SiteName);
    console.log("Audit History called",DocumentLibraryName);

  
    const {web}=await sp.site.openWebById(siteId)

     // Get the list item  corresponding to the file
     const fileItem:any = await web.getFileById(fileId).expand("ListItemAllFields")();
     console.log("fileItem",fileItem.ListItemAllFields.Status);
    
    // fetched the columns details corresponding to the file 
    const fileColumns =await sp.web.lists.getByTitle("DMSPreviewFormMaster").items.select("ColumnName","SiteName","DocumentLibraryName").filter(`SiteName eq '${SiteName}' and DocumentLibraryName eq '${DocumentLibraryName}' and IsDocumentLibrary ne 1`)();
    console.log("fileColumns",fileColumns);

    // Create an array of objects to store the columnName with there corresponding value
    const resultArrayThatContainstheColumnDetails = fileColumns.map((column) => {
    const columnName = column.ColumnName;
    const columnValue = fileItem.ListItemAllFields[columnName];

      return {
        label: columnName,
        value: columnValue !== undefined ? columnValue : null // Handle missing fields
      };
    });

    const objectForStatus={
      label:"Status",
      value:fileItem.ListItemAllFields.Status || ""
    }

    resultArrayThatContainstheColumnDetails.push(objectForStatus);
    console.log("result",resultArrayThatContainstheColumnDetails);

    // get the details of approver
    const itemsFromTaskList = await sp.web.lists.getByTitle('DMSFileApprovalTaskList').items.select(
      "Log","CurrentUser","Remark"	 	
           ,"LogHistory","ID"	                 
           ,"FileUID/FileUID"	         
           ,"FileUID/SiteName"	            
           ,"FileUID/DocumentLibraryName" 
           ,"FileUID/FileName"	              
           ,"FileUID/Status"		 
           ,"FileUID/RequestedBy"	 
           ,"FileUID/Created"	 
           ,"FileUID/ApproveAction"
           ,"MasterApproval/ApprovalType" 
           ,"MasterApproval/Level"	 
           ,"MasterApproval/DocumentLibraryName"
           ,"Modified"
        )
        .expand("FileUID", "MasterApproval")
        .filter(`FileUID/FileUID eq '${fileId}'`)
        .orderBy("Modified", false)();

        console.log("itemsFromTaskList",itemsFromTaskList);


    // Mapping to the desired format
    const approverDetailsArray = itemsFromTaskList.map(task => ({
      level: `Level ${task.MasterApproval.Level}`,
      approver: task.CurrentUser,
      actionDateTime:task.Modified,
      status: task.Log || "",
      remark: task.Remark || ""
    }));

    console.log("approverDetailsArray",approverDetailsArray);

  // Generate the dynamic HTML for the detail rows
  let detailRowsHTML = "";
  resultArrayThatContainstheColumnDetails.forEach((item, index) => {
      // Start a new row every 3rd item (when index is 0, 3, 6, ...)
      if (index % 3 === 0) {
        detailRowsHTML += '<div class="detail-row">';
      }
  
      // Add each detail column
      detailRowsHTML += `
        <div class="detail-column">
          <div class="detail-label">${item.label}</div>
          <div class="detail-value">${item.value}</div>
        </div>
      `;
  
      // Close the row after 3 items (when index is 2, 5, 8, ...)
      if ((index + 1) % 3 === 0) {
        detailRowsHTML += '</div>'; 
      }
  });

  // If there are leftover columns (less than 3 in the last row), close the row
  if (resultArrayThatContainstheColumnDetails.length % 3 !== 0) {
    detailRowsHTML += '</div>';
  }

   // Generate the dynamic HTML for the approver details
   let approverRowsHTML = "";
   approverDetailsArray.forEach((approver) => {
     approverRowsHTML += `
       <div class="detail-row-value-approver">
         <div class="detail-value-approver">${approver.level}</div>
         <div class="detail-value-approver">${approver.approver}</div>
         <div class="detail-value-approver">${approver.actionDateTime}</div>
         <div class="detail-value-approver">${approver.status}</div>
         <div class="detail-value-approver">${approver.remark}</div>
       </div>
     `;
   });

     // Create the popup
    const popup = document.createElement("div");
    popup.className = "audit-history-popup";
    popup.innerHTML = `
    <div class="popup-content-auditHistory">
      <div class="popup-header">
        <h5>Audit History</h5>
        <span class="close-btn" onclick="hideAuditHistoryPopup()">&times;</span>
      </div>
      <div class="popup-details">
        ${detailRowsHTML}
        <div class="detail-row-approver">
          <div class="detail-label-approver">Approval Level</div>
          <div class="detail-label-approver">Approver</div>
          <div class="detail-label-approver">Action DateTime</div>
          <div class="detail-label-approver">Status</div>
          <div class="detail-label-approver">Remark</div>
        </div>
        ${approverRowsHTML}
      </div>
    </div>
    `;

  // Append to body
  document.body.appendChild(popup);
  }
 
  // function to hide audit history pop
  // @ts-ignore
  window.hideAuditHistoryPopup=()=> {
    const popup = document.querySelector(".audit-history-popup");
    if (popup) {
      popup.remove();
    }
  }
  // start
    // Ref for MyFolder
    const myFolderButtonRef = useRef(null);
    const [triggerClick, setTriggerClick] = useState(false);
 
    const handleReturnToMainFromManageWorkFlow=()=>{
      setShowWorkflow(false);
      setShowfolderpermission(false)
      setActiveComponent('');
      setTriggerClick(true);
    }
 
    useEffect(() => {
      if (triggerClick && myFolderButtonRef.current) {
        myFolderButtonRef.current.click();  
        setTriggerClick(false);
      }
    }, [triggerClick]);
   useEffect(()=>{
    const workflowdiv= document.getElementById('workflowdiv')
    if(workflowdiv){
      workflowdiv.classList.add('workflowdivhide')
    }
   })
    // end
    return (
      <div id="wrapper" ref={elementRef}>
      <div
        className="app-menu"
        id="myHeader">
        <VerticalSideBar _context={sp} />
      </div>
      <div className="content-page">
        <HorizontalNavbar/>
        <div className="content" style={{marginLeft: `${!useHide ? '240px' : '80px'}`,marginTop:'0.8rem'}}>
         
        <div className="container-fluid  paddb">
                  {activeComponent === "" ? (
                    <div className=" dmsmaincontainer">
                      {showWorkflow && (
        <div id="workflowdiv">
          <ManageWorkFlow
            OthProps={propsForManageWorkFlow}
            onReturnToMain={handleReturnToMainFromManageWorkFlow}
          />
        </div>
      )}
      {showfolderpermission  && (
        <div id="showfolderpermission">
                   <ManageFolderPermission
                        OthProps={managePermissionProps}
                        onReturnToMain={handleReturnToMainFromManageWorkFlow}
                        />
        </div>
                       
                      )}
                  {/* Start Code Update by Amjad */}
                      <div className="row">
                               <div className="col-lg-6">
                                  <h4 className="page-title fw-bold mb-1 font-20">Dossier</h4>
                                  <ol className="breadcrumb m-0">
                      {" "}
                      <li className="breadcrumb-item">Home</li>
                     
                      <li className="breadcrumb-item">&gt;</li>{" "} 
                      <li className="breadcrumb-item active">Settings</li>
                    </ol>
                              </div>
  
                              
                              <div className="col-lg-6">
                          <div id="hidegidvewlistviewbutton" className="view-buttons mt-2">
                                  <button className="btn btngridview grid-view active"    
                                  onClick={(event: any = null, siteIdToUpdate: string = null)=>myRequest(event) }>
                                    <a className="listviewfonticon">          
                                      <FontAwesomeIcon style={{color: "black"}} icon={faTableCells}/> </a>Grid View
                                  </button>
                                  <button className="btn btnlistview list-view" onClick={(event:any)=>MyrequestshowListView('ListViewComponent')}>
                                    <a className="listviewfonticon">
                                    <FontAwesomeIcon style={{color: "black"}} icon={faListSquares}/>
                                    </a>
                                List View
                                  </button>
                                 
                            </div>
                            {showMyfavButtons && ( <div id="hidegidvewlistviewbutton2"  className="view-buttons mt-2">
                                    <button className="btn btngridview grid-view active"    
                                    onClick={(e)=>myFavorite(e)}>
                                      <a className="listviewfonticon">          
                                        <FontAwesomeIcon style={{color: "black"}} icon={faTableCells}/> </a>Grid View
                                    </button>
                                    <button className="btn btnlistview list-view" onClick={(event:any)=>MyrequestshowListView('ListViewComponent')}>
                                      <a className="listviewfonticon">
                                      <FontAwesomeIcon style={{color: "black"}} icon={faListSquares}/>
                                      </a>
                                      List View
                                    </button>
                            </div>) 
                            }
                            </div>

                            </div>
                             {/* End Code Update by Amjad */}
                      <div className="mainsidebardms">
                      
                      
                          
                        
                        <div className="sidebardms">
                     
                          <button
                          id= "Myrequestbutton"
                            className={`sidebardmsButton ${
                              activeButton === "MyRequest" ? "active" : ""
                            }`}
                            // onClick={() => handleClick('MyRequest')}
                            onClick={
                              (event)=>{
                                
                                myRequest(event);
                                handleShowContent(event)
                            }
                          }
                          >
                            <span className="sidebarIcon">
                              {/* <FontAwesomeIcon icon={faList} /> */}
                              <img className="sidebariconssmall" src={listicon}></img>
                            </span>
                            <span className="sidebarText">My Request</span>
                          </button>
  
                          <button
                            className={`sidebardmsButton ${
                              activeButton === "MyFavourite" ? "active" : ""
                            }`}
                            onClick={(event) => {  myFavorite(event);
                              handleShowContent(event);}}
                          >
                            <span className="sidebarIcon">
                            <img className="sidebariconssmall" src={starticon}></img>
                              {/* <FontAwesomeIcon icon={faStarRegular} /> */}
                            </span>
                            <span className="sidebarText">My Favourite</span>
                          </button>
  
                          <button
                            className={`sidebardmsButton ${
                              activeButton === "MyFolder" ? "active" : ""
                            }`}
                            onClick={(event)=>{
                              mycreatedfolders(event);
                              handleShowContent(event)
                            }}
                          >
                            <span className="sidebarIcon">
                            <img className="sidebariconssmall" src={foldericon}></img>
                              {/* <FontAwesomeIcon icon={faFolderRegular} /> */}
                            </span>
                            <span className="sidebarText">My Folder</span>
                          </button>
  
                          <button
                            className={`sidebardmsButton ${
                              activeButton === "ShareWithOther" ? "active" : ""
                            }`}
                            onClick={(e)=>{ShareWithOther(e);

                              handleShowContent(e)
                            }}
                          >
                            <span className="sidebarIcon">
                              {/* <FontAwesomeIcon icon={faShareAlt} /> */}
                              <img className="sidebariconssmall" src={sharewithothericon}></img>
                            </span>
                            <span className="sidebarText">Share with Other</span>
                          </button>
  
                          <button
                             onClick={(e)=>{ShareWithMe(e);handleShowContent(e)}}
                            className={`sidebardmsButton ${
                              activeButton === "ShareWithMe" ? "active" : ""
                            }`}
                          >
                            <span className="sidebarIcon">
                            <img className="sidebariconssmall" src={sharewithmeicon}></img>
                              {/* <FontAwesomeIcon icon={faShareAlt} /> */}
                            </span>
                            <span className="sidebarText">Share with me</span>
                          </button>
  
                          <button
                             onClick={(e)=>{Recyclebin(e);handleShowContent(e)}}
                            className={`sidebardmsButton ${
                              activeButton === "ShareWithMe" ? "active" : ""
                            }`}
                          >
                            <span className="sidebarIcon">
                            <img className="sidebariconssmall" src={recyclebin}></img>
                              {/* <FontAwesomeIcon icon={faShareAlt} /> */}
                            </span>
                            <span className="sidebarText">Recycle Bin</span>
                          </button>
                        </div>
                        <div id="folderContainer2"></div>
                      </div>
                      <div className="librarydata">
                        {showDeletepopup && (
                          <div className="popup">This is a small popup!</div>
                        )}
                         {/* Start Code Update by Amjad */}
                        <div className="row">
                          <div className="col-xl-7">
                        <div
                          id="selectedText"
                          style={{
                            display: "none",
                          }}
                        >
                          {selectedText ? (
                            <h6 className="mb-1 fw-bold text-dark header-title"
                              style={{
                                color: "black",
                                marginBottom: "0px",
                                fontSize: "16px",
                              }}
                            >
                              {selectedText}
                            </h6>
                          ) : (
                            <p className="sub-header font-14"></p>
                          )}
                          {dynamicContent && (
                            <p className="sub-header font-14" style={{ color: "#6c757d" }}>{dynamicContent}</p>
                          )}
                        </div>  
                        <div
                          id="breadcrumb"
                          style={{
                            display: "none",
                          }}
                        ></div>
  </div>
  <div className="col-xl-5">
  <div className="search-container position-relative">
                          <input
                            id="searchinput"
                            type="text"
                            className="search-input"
                            placeholder="Search files..."
                          />
                          <a className="searchbutton" onClick={searchFiles}>
                            <img
                              src={require("../assets/searchicon.png")}
                              alt="Search"
                              className="search-icon"
                            />
                          </a>
                        </div>
  
    </div>
    </div>
                     {/* End Code Update by Amjad */} 
  
                         <div id="files-container"></div>
                       {
                            // listorgriddata === ''  ? (
                            //   <div id="files-container"></div>
                            // ) : (
                            //   listorgriddata === 'showListView' && (
                            //     <Table
                            //     onReturnToMain={handleReturnToMain}
                            //     Currentbuttonclick={{ "buttonclickis": Myreqormyfav }}
                            //   />
                            //   )
                            // )
  
                            listorgriddata === ''  ? (
                              <div id="files-container"></div>
                            ) : (
                              listorgriddata === 'showListView' && (
                                <Table
                                onReturnToMain={handleReturnToMain}
                                Currentbuttonclick={{ "buttonclickis": Myreqormyfav }}
                              />
                              )
                            )
                       }
                       
                       
                      </div>
                     <div id="createuploadfilecont" className="createuploadfilecont"> 
                     <button
                        className="mybutton1"
                        id="createFileButton"
                        onClick={() => handleButtonClickShow("UploadFile")}
                      >
                        + Create File
                      </button>
                      
                        <button
                        className="mybutton2"
                        id="createFileButton2"
                        onClick={() => handleButtonClickShow("CreateFolder")}
                      >
                        + Create Folder
                      </button>
                      
                      
                      </div>
                <div className="Manageworkflow">
             
                </div>
                    </div>
                  ) : (
                    <div>
                      {activeComponent === "UploadFile" && (
                        <UploadFile
                        currentfolderpath={{
                           "Entity" : currentEntity,
                           "Entityurl": currentEntityURL,
                           "siteID": currentsiteID,
                           "Devision":  currentDevision,
                           "Department" : currentDepartment,
                           "DocumentLibrary": currentDocumentLibrary,
                           "Folder" :currentFolder,
                           "folderpath": currentfolderpath
                          }}
                          onReturnToMain={handleReturnToMain}
                        />
                      )}
                        {activeComponent === "CreateFolder" && (
                      <CreateFolder  OthProps={{
                        "Entity" : currentEntity,
                        "Entityurl": currentEntityURL,
                        "siteID": currentsiteID,
                        "Devision":  currentDevision,
                        "Department" : currentDepartment,
                        "DocumentLibrary": currentDocumentLibrary,
                        "Folder" :currentFolder,
                        "folderpath": currentfolderpath
                       }}
                       onReturnToMain={handleReturnToMain} />
                      )}
                    
                     
                    </div>
                  )}
                </div>
              </div>
            </div>
            </div>
          
     
          
    );
  };
  
  
  
  const DMSMain: React.FC<IDmsMusaibProps> = (props) =>{
    return (
      <Provider>
        <ArgPoc  props={props}/>
      </Provider>
    );
  };
  
  export default DMSMain;
  