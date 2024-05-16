export const pinMeetingToUsers = async (users, meeting, mutation) => {
    const { id, start, end, link, host } = meeting;
    await mutation({
        variables: {
            emails: users,
            id,
            start,
            end,
            host,
            link,
        },
    });
}