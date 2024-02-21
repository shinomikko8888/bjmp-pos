import '../../../styles/modals/general.css'

export default function ModalBody({content}){
    return(
        <>
            <div className='custom-modal-body'>
                {content}
            </div>
        </>
    )
}