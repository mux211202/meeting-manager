function Meetings({ meetings }) {
    return (
        <div className="Meeting">
            {
                !!meetings?.length && meetings.map( ({id, start, end, link, host}) => {
                    if(id && start && end && link && host) {
                        return (
                            <div key={id}>
                                <div><strong>Start:</strong> {start}</div>
                                <div><strong>End:</strong> {end}</div>
                                <div><strong>Host:</strong> {host}</div>
                                <div><strong>Link:</strong> {link}</div>
                                <br/>
                            </div>
                        );
                    }
                    return null;
                })
            }
        </div>
    );
}

export default Meetings;