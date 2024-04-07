export const pinMeetingToUsers = async (users, meeting, mutation) => {
    const { id, start, end, link, host } = meeting;
    for(let i = 0; i < users.length; i++) {
        const invitedUser = users[i];
        await mutation({
            variables: {
                userEmail: invitedUser,
                id,
                start,
                end,
                host,
                link,
            },
        });
    }
}