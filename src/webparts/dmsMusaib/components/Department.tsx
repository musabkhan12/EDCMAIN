import * as React from 'react';
import { getSP } from '../loc/pnpjsConfig';
import { SPFI } from '@pnp/sp';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../CustomCss/mainCustom.scss";
// import "../../verticalSideBar/components/VerticalSidebar2.scss"
// import VerticalSideBar from '../../verticalSideBar/components/VerticalSideBar';
import UserContext from '../../../GlobalContext/context';

import Provider from '../../../GlobalContext/provider';
import { useMediaQuery } from 'react-responsive';
// import context from '../../../GlobalContext/context';

// import classNames from "classnames";
import styles from './Form.module.scss'
// import { useState, useEffect, useRef , useMemo } from "react";


// import JoditEditor from "jodit-react";
// import Jodit from 'jodit-react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../CustomCss/mainCustom.scss";
// import "../../verticalSideBar/components/VerticalSidebar.scss"
import CreateDepartment from './CreateDepartment';

const Department = () => {

  const sp: SPFI = getSP();
  console.log(sp, 'sp');
  const { useHide }: any = React.useContext(UserContext);
  console.log('This function is called only once', useHide);
  const elementRef = React.useRef<HTMLDivElement>(null);

  const [departmentDetails,setdivisionDetails]=React.useState<any[]>([]);
  console.log("Fetched Entity",departmentDetails);
 
 
  React.useEffect(()=>{
        async function fetchData(){
            console.log("Fetchin Entity");
            const department = await sp.web.lists
            .getByTitle('DepartmentMasterList')
            .items.select("Title","Active","Created","UniqueId","Author/Title","Editor/Title","Id").expand("Author","Editor")();
            setdivisionDetails(department);
            console.log("Fetched Entity",department);
        }

        fetchData();
  },[])

  
  // Media query to check if the screen width is less than 768px
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    
  
    const [showFirstDiv, setShowFirstDiv] = React.useState(true);
    const [currentDepartmentId, setCurrentDepartmentId] = React.useState<number | null>(null);
    const [currentJobTitle, setCurrentJobTitle] = React.useState('');
    const [currentIsActive, setCurrentIsActive] = React.useState('');
    
    const dynamicHeading=currentDepartmentId? "Edit Department" : "Create Department";

    const handleButtonClickShow = () => {
      setShowFirstDiv(false);
      setCurrentDepartmentId(null);
      setCurrentJobTitle('');
      setCurrentIsActive('');
    };
  
    const handleBackButtonClick = () => {
      // Show the first div and hide the second div when the back button is clicked.
      setShowFirstDiv(true);
      setCurrentDepartmentId(null);
      setCurrentJobTitle('');
      setCurrentIsActive('');
    };

    const handleEditClick=(department:any)=>{
      console.log("Department",department)
      setShowFirstDiv(false);
      setCurrentDepartmentId(department.Id);
      setCurrentJobTitle(department.Title);
      setCurrentIsActive(department.Active);
  }
        
  return (
 <div>
{showFirstDiv ? (
        <div className={styles.argform}>
          <header>
            <div className={styles.title}>Department</div>
            <div className={styles.actions}>
              {/* <a className={styles.backbuttonform}>
                <img
                  className={styles.backimg}
                //   src={require("../assets/left.png")}
                />
                <p className={styles.Addtext}>Back</p>
              </a> */}
              <a
                onClick={handleButtonClickShow}
                className={styles.addbuttonargform}
              >
                {/* <img
                  className={styles.addimg}
                  src={require("../assets/plus.png")}
                /> */}
                <p className={styles.Addtext}>Create New</p>
              </a>
            </div>
          </header>
          <div className={styles.container}>
            <table className={styles["event-table"]}>

              <thead>
                <tr>
                  <th className={styles.serialno}>S.No.</th>
                  <th className={styles.tabledept}>Title</th>
                  <th className={styles.tabledept}>IsActive</th>
                  <th className={styles.tabledept}>Created At</th>
                  <th className={styles.tabledept}>Created By</th>
                  <th className={styles.tabledept}>Modified By</th>
                  <th className={styles.editdeleteicons}>Action</th>
                </tr>
              </thead>
              <tbody>
                {departmentDetails.map((item, index) => (
                    <React.Fragment key={item.UniqueId}>
                    <tr className={styles.tabledata}>
                        <td className={styles.serialno}>
                        &nbsp; &nbsp; {index + 1}
                        </td>
                        <td className={styles.tabledept}>
                        {item.Title || 'No Title'}
                        </td>
                        <td className={styles.tabledept}>
                        {item.Active === 'Yes' ? 'Active' : 'Inactive'}
                        </td>
                        <td className={styles.tabledept}>
                        {item.Created || 'No Date'}
                        </td>
                        <td className={styles.tabledept}>
                        {item.Author.Title || 'No Author'}
                        </td>
                        <td className={styles.tabledept}>
                        {item.Editor.Title || 'No Author'}
                        </td>
                        <td className={styles.editdeleteicons}>
                        <img
                            className={styles.editdicon}
                            src={require("../assets/edit.svg")}
                            alt="Edit"
                            onClick={() => handleEditClick(item)}
                        />
                        <img
                            className={styles.deleteicon}
                            src={require("../assets/delete.png")}
                            alt="Delete"
                        />
                        </td>
                    </tr>
                    </React.Fragment>
                ))}
            </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className={styles.argform}>
          <header style={{marginBottom:"20px"}}>
            <div className={styles.title}>{dynamicHeading}</div>
            <div className={styles.actions}>
              <a
                className={styles.backbuttonform}
                onClick={handleBackButtonClick}
              >
                <img
                  className={styles.backimg}
                //   src={require("../assets/left.png")}
                />
                <p className={styles.Addtext}>Back</p>
              </a>
            </div>
          </header>
          <CreateDepartment
              currentId={currentDepartmentId}
              currentJobTitle={currentJobTitle}
              currentIsActive={currentIsActive}
              onCancel={() => setShowFirstDiv(true)} 
          />

        </div>

      )}
 </div>
                
             
  );
};


export default Department;
