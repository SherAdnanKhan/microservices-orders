import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { deletePost, reportPost, changeCritqueStatus, sharePostOnStrq, clearStatus, shareMzFlash } from "../../actions/postAction";
import { unfavGallery } from "../../actions/galleryActions";
const ModalFunctions = ({
}) => {
    const dispatch = useDispatch();
    const [, setShowDeleteModel] = useState(false);
    const [, setShowModelShare] = useState(false);
    const [, setShowModelReport] = useState(false);
    const [, setshowModelStrqShare] = useState(false);
    const [, setshowModalTurnOffCritque] = useState(false);
    const [, setShowModalRepost] = useState(false);
    const [, setGalleryId] = useState('');
    const [, setShowMzFlashModal] = useState(false);


    const handlePostDeleteModel = (value) => {
        setShowDeleteModel(value);
    };

    const handleDelete = (status, post) => {
        setShowDeleteModel(status);
        dispatch(deletePost(post));
    }

    const handleShareModel = (status) => {
        //dispatch(standardSharePost(post.id));
        setShowModelShare(status);
    };

    const handleUnfavGallery = (gallery) => {
        dispatch(unfavGallery(gallery));
    }

    const handleReportModel = (status) => {
        setShowModelReport(status);
    }

    const onReport = (post) => {
        dispatch(reportPost(post.id));
        setShowModelReport(false);
    }

    const handleStrqShareModel = (status) => {
        setshowModelStrqShare(status);
    }

    const onStrqShare = (post, userId) => {
        dispatch(sharePostOnStrq(post, userId))
        dispatch(clearStatus())
    }
    const handleTurnOffCrtiquesModal = (value) => {
        setshowModalTurnOffCritque(value);
    }
    const handleTurnOnOffCrtique = (modalStatus, post, status) => {
        setshowModalTurnOffCritque(modalStatus);
        dispatch(changeCritqueStatus(post, status));
    }
    const handleMzFlashModal = (status) => {
        setShowMzFlashModal(status);
    }
    const handleMzFlash = (status, post) => {
        setShowMzFlashModal(status);
        dispatch(shareMzFlash(post));
    }


    return (
        <>

        </>

    );
}


export default ModalFunctions;





