import '../../../styles/modals/general.css'

export default function ModalFooter({content}){
    return(
        <>
            <div className='custom-modal-footer'>
                {content}
            </div>
        </>
    )
}