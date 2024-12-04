import * as React from 'react';
import Provider from '../../../GlobalContext/provider';
import  styles from './BasicForm.module.scss'
import classNames from "classnames";
import { getSP } from '../loc/pnpjsConfig';
import { SPFI } from '@pnp/sp';
import { useState} from "react";
import { EnvironmentType } from '@microsoft/sp-core-library';
// import { BasicFormProps }  from './IDmsMusaibProps'
import Swal from 'sweetalert2';
interface BasicFormProps {
    currentId :any,
    currentJobTitle:any,
    currentIsActive:any,
    onCancel:any,
}

let currentusername="";

const Basic: React.FC<BasicFormProps> = ({
    currentId,
    currentJobTitle,
    currentIsActive,
    onCancel,
})=>{

    const sp: SPFI = getSP();
    // console.log(sp);
    console.log("currentId",currentId);
    const [jobTitle, setJobTitle] = useState(currentJobTitle || '');
    const [isActive, setIsActive] = useState(currentIsActive || '');
    const [description,setDescription] = useState('');
    // const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [disableInput, setDisableInput]=useState(false);

    React.useEffect(()=>{
        setDisableInput(true);
    },[]);

    if(currentId !== null && disableInput){
                const title=document.getElementById("jobTitle") as HTMLInputElement;;
                const description=document.getElementById("description") as HTMLInputElement;;
                console.log("title",title);
                console.log("description",description);
                title.disabled = true;
                description.disabled = true;
    }


    // Handle form submission 
    const handleSubmit = async (event: any) => {
        event.preventDefault(); 
        const form=document.getElementById('createMaster') as HTMLFormElement
        if (!form.checkValidity()) {
            // form.reportValidity(); // Show validation errors

            checkValidation();
            return;
        }

        const newItem = {
            Title: jobTitle, 
            Active: isActive,
            Description:description 
        };
        console.log(newItem);

        const listTitle='MasterSiteURL';

        try {

            if(currentId){
                let alreadyExist=false;
                const entity=await sp.web.lists.getByTitle(listTitle).items.getAll();
                console.log("entity",entity);
                entity.forEach((e)=>{
                    if(e.Title !== null){
                        if(e.Title.replace(/\s+/g, '').toLowerCase() === jobTitle.replace(/\s+/g, '').toLowerCase()){
                            // alert(`${jobTitle} Already exist,`);
                            // setErrorMessage(`${jobTitle} already exists.`);
                            if(e.Active === isActive){
                                // console.log("e.Active",e.Active,"isActive",isActive);
                                alreadyExistValue1();
                                alreadyExist=true;
                                return;
                            }
                            
                        }
                }
                })

                if(!alreadyExist){
                    console.log("Edit Entity Id",currentId);
                    await sp.web.lists.getByTitle(listTitle).items.getById(currentId).update({
                    Active:isActive
                    });
                    updateValue(jobTitle);
                    // alert('Division updated successfully');
                }
            }else{

            // Check if already exist
            let alreadyExist=false;
            const entity=await sp.web.lists.getByTitle(listTitle).items.getAll();
            // console.log("entity",entity);

            entity.forEach((e)=>{
                if(e.Title !== null){
                    if(e.Title.replace(/\s+/g, '').toLowerCase() === jobTitle.replace(/\s+/g, '').toLowerCase()){
                        // alert(`${jobTitle} Already exist,`);
                        // setErrorMessage(`${jobTitle} already exists.`);
                        alreadyExistValue(jobTitle);
                        alreadyExist=true;
                        return;
                    }
            }
            })

            //Create New Entity
            if(!alreadyExist){
                // setErrorMessage(null);
                const data=await sp.web.lists.getByTitle(listTitle).items.add(newItem);
                console.log("Testing");
                // alert(`${jobTitle} added successfully`);
                onSuccess(jobTitle);
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

    };

    const clearForm=()=>{
        setJobTitle("");
        setIsActive("");
        setDescription("");
    }

    const checkValidation=()=>{
        Swal.fire("Please fill out the fields!", "All fields are required");
    }

    const alreadyExistValue=(jobTitle:any)=>{
        Swal.fire(`${jobTitle} Exist`, "Please change the entity name", "warning");
    }

    const alreadyExistValue1=()=>{
        Swal.fire(`Already Exist`, "Please change the type", "warning");
    }

    const onSuccess=(jobTitle:any)=>{
        Swal.fire(`${jobTitle} Created`,"", "success");
    }

    const updateValue=(jobTitle:any)=>{
        Swal.fire(`${jobTitle} Updated`,"", "success");
    }

  return (
        
    <>  
        <div className={styles.argform}>
        <div className={styles.formcontainer}>            
            <div className={styles.apphier}>
                <h1 className={styles.apptitle}>Create Entity</h1>
            </div>
            <hr className={styles.hrtag}></hr>
            <form id="createMaster" onSubmit={handleSubmit}>
                <div className={classNames(styles.formgroup, styles.topformgroup)}>
                    {/* <div className={classNames(styles.halfleftform, styles.form1)}>
                        <label className={styles.label} htmlFor="company">
                            Name
                        </label>
                        <input
                            disabled
                            value={currentusername} 
                            className={styles.inputform1}
                            type="text"
                            id="company"
                            name="company"
                            required
                        />
                    </div> */}
                    <div className={classNames(styles.halfrightform, styles.form1)}>
                        <label className={styles.label} htmlFor="jobTitle">
                            Title
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
                        <label className={styles.label} htmlFor="description">
                            Description
                        </label>
                        <input
                            className={styles.inputform1}
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className={classNames(styles.halfrightform, styles.form1)}>
                        <label className={styles.label} htmlFor="isActive">
                            isActive
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
                    <button type="button" className={styles.addbuttonargform1}
                        onClick={onCancel}
                    >
                        <p 
                            className={styles.Addtext}
                            
                        >
                            Cancel
                        </p>
                    </button>
        </div>
    </div>
    </>
  )
}

// const BasicForm = () => {
//     return (
//         <Provider>
//             <Basic/>
//         </Provider>
//     );
// };

// export default BasicForm;

const BasicForm: React.FC<BasicFormProps> = ({
    currentId,
    currentJobTitle,
    currentIsActive,
    onCancel,
})=>{ return (
        <Provider>
            <Basic
            
            currentId={currentId}
            currentJobTitle={currentJobTitle}
            currentIsActive={currentIsActive}
            onCancel={onCancel} 
            />
        </Provider>
    );
};

export default BasicForm;
