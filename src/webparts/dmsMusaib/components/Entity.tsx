import * as React from 'react';
import { getSP } from '../loc/pnpjsConfig';
import { SPFI } from '@pnp/sp';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../CustomCss/mainCustom.scss";
// import "../../verticalSideBar/components/VerticalSidebar.scss"
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
import CreateEntity from './CreateMaster';

const Entity = () => {

  const sp: SPFI = getSP();
  console.log(sp, 'sp');
  const { useHide }: any = React.useContext(UserContext);
  console.log('This function is called only once', useHide);
  const elementRef = React.useRef<HTMLDivElement>(null);

  const [entityDetails,setEntityDetails]=React.useState<any[]>([]);
  console.log("Fetched Entity",entityDetails);
 
 
  React.useEffect(()=>{
        async function fetchData(){
            console.log("Fetchin Entity");
            const entity = await sp.web.lists
            .getByTitle('MasterSiteURL')
            .items.select("SiteURL","Title","Active","Created","Description","UniqueId","Author/Title","Id").expand("Author")();
            setEntityDetails(entity);
            console.log("Fetched Entity",entity);
        }

        fetchData();
  },[])

  
  // Media query to check if the screen width is less than 768px
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    
  
    const [showFirstDiv, setShowFirstDiv] = React.useState(true);
    const [currentEntityId, setCurrentEntityId] = React.useState<number | null>(null);
    const [currentJobTitle, setCurrentJobTitle] = React.useState('');
    const [currentIsActive, setCurrentIsActive] = React.useState('');

    const handleButtonClickShow = () => {
      setShowFirstDiv(false);
      setCurrentEntityId(null);
      setCurrentJobTitle('');
      setCurrentIsActive('');
    };
  
    const handleBackButtonClick = () => {
      // Show the first div and hide the second div when the back button is clicked.
      setShowFirstDiv(true);
      setCurrentEntityId(null);
      setCurrentJobTitle('');
      setCurrentIsActive('');
    };

    const handleEditClick=(entity:any)=>{
        console.log("entity",entity)
        setShowFirstDiv(false);
        setCurrentEntityId(entity.Id);
        setCurrentJobTitle(entity.Title);
        setCurrentIsActive(entity.Active);
    }
        
  return (
<div>
{showFirstDiv ? (
        <div className={styles.argform}>
          <header>
            <div className={styles.title}>Entity</div>
            <div className={styles.actions}>
              <a className={styles.backbuttonform}>
                <img
                  className={styles.backimg}
                //   src={require("../assets/left.png")}
                />
                <p className={styles.Addtext}>Back</p>
              </a>
              <a
                onClick={handleButtonClickShow}
                className={styles.addbuttonargform}
              >
                <img
                  className={styles.addimg}
                  src={require("../assets/plus.png")}
                />
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
                  <th  className={styles.tabledept}>Description</th>
                  <th className={styles.tabledept}>URL</th>
                  <th className={styles.tabledept}>IsActive</th>
                  <th className={styles.tabledept}>Created At</th>
                  <th className={styles.tabledept}>Created By</th>
                  <th className={styles.editdeleteicons}>Action</th>
                </tr>
              </thead>
              <tbody>
                {entityDetails.map((item, index) => (
                    <React.Fragment key={item.UniqueId}>
                    <tr className={styles.tabledata}>
                        <td className={styles.serialno}>
                        &nbsp; &nbsp; {index + 1}
                        </td>
                        <td className={styles.tabledept}>
                        {item.Title || 'No Title'}
                        </td>
                        <td className={styles.tabledept}>
                        {item.Description || 'No Description'}
                        </td>
                        <td className={styles.tabledept} title={item.SiteURL}>
                        {item.SiteURL || 'No URL'}
                        </td>
                        <td className={styles.tablename}>
                        {item.Active === "Yes" ? 'Active' : 'Inactive'}
                        </td>
                        <td className={styles.tabledept}>
                        {item.Created || 'No Date'}
                        </td>
                        <td className={styles.tabledept}>
                        {item.Author.Title || 'No Author'}
                        </td>
                        <td className={styles.editdeleteicons}>
                        <img
                            className={styles.editdicon}
                            src={require("../assets/edit.svg")}
                            alt="Edit"
                            onClick={() => handleEditClick(item)}
                        />
                        {/* <img
                            className={styles.deleteicon}
                            src={require("../assets/delete.png")}
                            alt="Delete"
                        /> */}
                        </td>
                    </tr>
                    </React.Fragment>
                ))}
            </tbody>
            </table>
            {/* <div className={styles.pagination}>
              <a href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
            </div> */}
          </div>
        </div>
      ) : (
        <div className={styles.argform}>
          <header style={{marginBottom:"20px"}}>
            <div className={styles.title}>Create Entity</div>
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
          <CreateEntity
                currentId={currentEntityId}
                currentJobTitle={currentJobTitle}
                currentIsActive={currentIsActive}
                onCancel={() => setShowFirstDiv(true)}
          />
        </div>

      )}
</div>
              
              
  );
};

export default Entity;
