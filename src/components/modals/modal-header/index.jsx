import '../../../styles/modals/general.css'

export default function ModalHeader({content}){
    return(
        <>
            <div className='custom-modal-header'>
                {content}
            </div>
        </>
    )
}