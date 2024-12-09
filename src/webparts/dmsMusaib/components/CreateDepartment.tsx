import * as React from 'react';
import Provider from '../../../GlobalContext/provider';
import  styles from './BasicForm.module.scss'
import classNames from "classnames";
import { getSP } from '../loc/pnpjsConfig';
import { SPFI } from '@pnp/sp';
import { useState} from "react";
import {BasicFormProps} from './BasicFormProps'
import Swal from 'sweetalert2';
// import swal from 'sweetalert2';

const CreateDepartment: React.FC<BasicFormProps> = ({
    currentId,
    currentJobTitle,
    currentIsActive,
    onCancel,
})=>{

    const sp: SPFI = getSP();
    // console.log(sp);

    const dynamicHeading =currentId ? "Edit Department" : "Create Department";

    const [jobTitle, setJobTitle] = useState(currentJobTitle || '');
    const [isActive, setIsActive] = useState(currentIsActive || '');
    // console.log("Oncancle",onCancel);

    // State for error message
    // const [errorMessage, setErrorMessage] = useState<string | null>(null);



    const handleSubmit = async (event: any) => {
        event.preventDefault(); 

        // console.log(jobTitle,isActive)
        const form=document.getElementById('createDepartment') as HTMLFormElement
        if (!form.checkValidity()) {
            // form.reportValidity(); // Show validation errors
            checkValidation();
            return;
        }

        const newItem = {
            Title: jobTitle, 
            Active: isActive, 
        };
        console.log(newItem);

        const listTitle='DepartmentMasterList';

        try {

            if (currentId) {

                // fetch the data from DMSfolderMaster
                const folderMaster=await sp.web.lists.getByTitle("DMSFolderMaster").items.select("Department","Id").filter(`Department eq '${currentJobTitle}'`)();
                console.log("folderMaster",folderMaster);
                 // check if department exist
                 let alreadyExist=false;
                 const departments=await sp.web.lists.getByTitle(listTitle).items.getAll();
                 // console.log("deaprtments",departments);
                 departments.forEach((department)=>{
                     // console.log("deparment ",department.Title);
                     if(department.Title !== null){
                             if(department.Title.replace(/\s+/g, '').toLowerCase() === jobTitle.replace(/\s+/g, '').toLowerCase()){
                                 // alert(`${jobTitle} Already exist,`);
                                 // setErrorMessage(`${jobTitle} already exists.`);
                                 if(department.Active === isActive){
                                    alreadyExistValue1();
                                    alreadyExist=true;
                                    return;
                                 }
                                
                             }
                     }
                 })

                if(!alreadyExist){
                    folderMaster.forEach(async(departmentToUpdate)=>{
                       const updatedData= await sp.web.lists.getByTitle('DMSFolderMaster').items.getById(departmentToUpdate.ID).update({
                            Department:jobTitle
                        });
                        console.log("Updated department in DMSFolderMaster",updatedData);
                    })
                }
                // Update existing Department
                if(!alreadyExist){
                    await sp.web.lists.getByTitle(listTitle).items.getById(currentId).update(newItem);
                    updateValue(jobTitle);
                    clearForm();
                    setTimeout(()=>{
                            onCancel();
                    },1000)
                    // alert('Department updated successfully');
                }
                
                

            } else {  
                
                // check if department exist
                let alreadyExist=false;
                const departments=await sp.web.lists.getByTitle(listTitle).items.getAll();
                // console.log("deaprtments",departments);
                departments.forEach((department)=>{
                    // console.log("deparment ",department.Title);
                    if(department.Title !== null){
                            if(department.Title.replace(/\s+/g, '').toLowerCase() === jobTitle.replace(/\s+/g, '').toLowerCase()){
                                // alert(`${jobTitle} Already exist,`);
                                // setErrorMessage(`${jobTitle} already exists.`);
                                alreadyExistValue(jobTitle);
                                alreadyExist=true;
                                return;
                            }
                    }
                })

                // Create new Department
                if(!alreadyExist){
                    // setErrorMessage(null); 
                    await sp.web.lists.getByTitle(listTitle).items.add(newItem);
                    onSuccess(jobTitle);
                    // alert(`${jobTitle} added successfully`);
                    clearForm();
                    setTimeout(()=>{
                            onCancel();
                    },1000)
                }
            }

        } catch (error) {
            console.error('Error adding item:', error);
            alert('Error adding item');
        }
        // clearForm();
        // setTimeout(()=>{
        //     onCancel();
        // },1000)
        
        // clearForm();
       
    };

    const clearForm=()=>{
        setJobTitle("");
        setIsActive("");
        // setDescription("");
    }

    const checkValidation=()=>{
        Swal.fire("Please fill out the fields!", "All fields are required");
    }

    const alreadyExistValue=(jobTitle:any)=>{
        Swal.fire(`${jobTitle} Exist`, "Please change the department name", "warning");
    }

    const alreadyExistValue1=()=>{
        Swal.fire(`Already Exist`, "Please change the department name or type", "warning");
    }

    const onSuccess=(jobTitle:any)=>{
        Swal.fire(`${jobTitle} Created`,"", "success");
    }

    const updateValue=(jobTitle:any)=>{
        Swal.fire(`${jobTitle} Updated`,"", "success");
    }

  return (
        
    <>  
        <div className={styles.DmsAdminForm}>
        <div className={styles.formcontainer}>            
            <div className={styles.apphier}>
                <h1 className={styles.apptitle}>Create Department</h1>
            </div>
            <hr className={styles.hrtag}></hr>
            <form id="createDepartment" onSubmit={handleSubmit}>
                <div className={classNames(styles.formgroup, styles.topformgroup)}>
                    <div className={classNames(styles.halfrightform, styles.form1, styles.createdepartmenthalf)}>
                        <label className={styles.label} htmlFor="jobTitle">
                            {dynamicHeading}
                        </label>
                        <input
                            className={styles.inputform1}
                            id="jobTitle"
                            name="jobTitle"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className={classNames(styles.halfrightform, styles.form1)}>
                        <label className={styles.label} htmlFor="isActive">
                            Active
                        </label>
                        <div className={styles.radioContainer}>
                        <div className={styles.radioContainer}>
                            <div className={styles.radioItem}>
                            <input
                                type="radio"
                                id="yesOption"
                                name="isActive"
                                value="Yes"
                                checked={isActive === 'Yes'}
                                onChange={(e) => setIsActive(e.target.value)}
                                required
                            />
                            <label htmlFor="yesOption">Yes</label>
                            </div>
                            <div className={styles.radioItem}>
                            <input
                                type="radio"
                                id="noOption"
                                name="isActive"
                                value="No"
                                checked={isActive === 'No'}
                                onChange={(e) => setIsActive(e.target.value)}
                                required
                            />
                            <label htmlFor="noOption">No</label>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </form>
        </div>
        
        <div className={styles.approvecancel}>
                    <button type="submit" className={styles.backbuttonform1} onClick={handleSubmit}>
                        <p className={styles.Addtext}>Submit</p>
                    </button>
                    <button type="button" className={styles.addbuttonargform1}     onClick={onCancel}>
                        <p className={styles.Addtext}>Cancel</p>
                    </button>
        </div>
    </div>
    </>
  )
}

const CreateDepartment2: React.FC<BasicFormProps> = ({
    currentId,
    currentJobTitle,
    currentIsActive,
    onCancel,
})=> {
    return (
        <Provider>
            <CreateDepartment
                    currentId={currentId}
                    currentJobTitle={currentJobTitle}
                    currentIsActive={currentIsActive}
                    onCancel={onCancel} 
            />
        </Provider>
    );
};

export default CreateDepartment2;
