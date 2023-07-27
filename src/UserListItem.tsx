import React from 'react';
import {RiArrowDropDownLine,RiEdit2Line} from 'react-icons/ri';
import {RiArrowDropUpLine} from 'react-icons/ri'
import {IoMdCloseCircleOutline} from 'react-icons/io';
import {AiFillDelete,AiOutlineCheckCircle} from 'react-icons/ai'
interface User {
    id: number;
    first: string;
    last: string;
    dob: string;
    gender: string;
    email: string;
    picture: string;
    country: string;
    description: string;
}

interface UserListItemProps {
    user: User;
    active: boolean;
    editMode: boolean;
    onAccordionClick: (userId: number) => void;
    onEditClick: (userId: number) => void;
    onSaveClick: (userId: number) => void;
    onCancelClick: (userId: number) => void;
    onDeleteClick: (userId: number) => void;
    onInputChange: (userId: number, field: string, value: string) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({
    user,
    active,
    editMode,
    onAccordionClick,
    onEditClick,
    onSaveClick,
    onCancelClick,
    onDeleteClick,
    onInputChange
}) => {
    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return `${age} years`;
    };


    return (
        <div className='container'>
            
                <div className='item'>
                <button
                onClick={() => onAccordionClick(user.id)}
                className={`accordion ${active ? 'active' : ''}`}
            >
                
                    <div className='title'>
                        {<img src={user.picture} alt={`${user.first} ${user.last}`} />} <div>{user.first} {user.last} {active ? <RiArrowDropUpLine/>:<RiArrowDropDownLine/>}</div>
                    </div>
                    </button>
                    
                    {active && (
                        <div className="content">

                            {editMode ? (
                                <div>
                                    <label>Age:</label>
                                    <input type="text" value={user.dob} onChange={(e) => onInputChange(user.id, 'dob', e.target.value)} />
                                </div>
                            ) : (
                                <div>
                                    <label>Age:</label>
                                    <span>{calculateAge(user.dob)}</span>
                                </div>
                            )}
                            {editMode ? (
                                <div>
                                    <label>Gender:</label>
                                    <select value={user.gender} onChange={(e) => onInputChange(user.id, 'gender', e.target.value)}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Transgender">Transgender</option>
                                        <option value="Rather not say">Rather not say</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            ) : (
                                <><label>Gender:</label><span>{user.gender}</span></>
                            )}
                            {editMode ? (
                                <div>
                                    <label>Country:</label>
                                    <input type="text" value={user.country} onChange={(e) => onInputChange(user.id, 'country', e.target.value)} />
                                </div>
                            ) : (
                                <div>
                                    <label>Country:</label>
                                    <span>{user.country}</span>
                                </div>
                            )}
                            {editMode ? (
                                <div>
                                    <label>Description:</label>
                                    <textarea value={user.description} onChange={(e) => onInputChange(user.id, 'description', e.target.value)} />
                                </div>
                            ) : (
                                <div>
                                    <label>Description:</label>
                                    <span>{user.description}</span>
                                </div>
                            )}
                            {editMode ? (
                                <div>
                                    <button onClick={() => onSaveClick(user.id)}><AiOutlineCheckCircle color='green' size={30}/></button>
                                    <button onClick={() => onCancelClick(user.id)}><IoMdCloseCircleOutline color='red' size={30}/></button>
                                </div>
                            ) : null}
                            {!editMode && (
                                <div>
                                    <button onClick={() => onDeleteClick(user.id)}><AiFillDelete color='red' size={30}/></button>
                                    <button onClick={() => onEditClick(user.id)} ><RiEdit2Line color='blue' size={30}></RiEdit2Line></button>
                                </div>
                            )}
                        </div>
                    )}
                    
                </div>
                
        </div>

    );
};

export default UserListItem;







