import { Meeting } from "../Meeting/Meeting";
function Meetings({ meetings, handleClose }) {
    return (
        <div className="Meeting">
            {
                !!meetings?.length && meetings.map( (meeting) => {
                    const {id, start, end, link, host} = meeting;


                    if(id && start && end && link && host) {
                        return (
                            <Meeting handleClose={handleClose} {...meeting}/>
                        );
                    }
                    return null;
                })
            }
        </div>
    );
}

export default Meetings;