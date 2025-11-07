import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { SERVICE } from "../../../../../../config/config";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPen } from '@fortawesome/free-solid-svg-icons';
// import EditModal from './EditModal';

const TabProfile = (props) => {
    const [profile, setProfile] = useState([])
    // const [modalShow, setModalShow] = useState(false);


    // const toggle = () => {
    //     setModalShow(!modalShow)
    // }

    useEffect(() => {
        const getData = async () => {
            await axios.get(SERVICE.JAVA_SERVICE + "/client/" + props.id).then(response => {
                setProfile(response.data.data);
            })

        };
        getData();
    }, [props.id])

    return (
        <>
            <div className="btn-actions-pane-right">
                <Button
                    className="mr-3 float-left btn-pill mb-3"
                    onClick={() => { props.toggleEdit(); props.toggleView() }}
                    style={{ backgroundColor: "grey", border: "none" }}
                >
                    <FontAwesomeIcon icon={faPen} />
                    <span> Edit</span>
                </Button>
            </div>
            <Table striped className="mb-0">
                <thead className="text-center">
                    <tr>
                        <th>Profile</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td style={{ width: 180 }}>ID</td>
                        <td>{profile.id}</td>
                    </tr>
                    <tr>
                        <td style={{ width: 180 }}>Nama</td>
                        <td>{profile.nama}</td>
                    </tr>
                    <tr>
                        <td style={{ width: 180 }}>Nickname</td>
                        <td>{profile.nickname}</td>
                    </tr>

                    <tr>
                        <td style={{ width: 180 }}>Alamat</td>
                        <td>{profile.alamat}</td>
                    </tr>
                    <tr>
                        <td style={{ width: 180 }}>No. Hp</td>
                        <td>{profile.noHp}</td>
                    </tr>
                    <tr>
                        <td style={{ width: 180 }}>E-mail</td>
                        <td>{profile.email}</td>
                    </tr>
                    <tr>
                        <td style={{ width: 180 }}>Sales</td>
                        <td>{profile.sales}</td>
                    </tr>

                </tbody>
            </Table>
        </>

    )

}

export default TabProfile;
