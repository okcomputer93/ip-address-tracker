export const state = {
    ipInfo: {},
    queries: [],
};

export const searchIp = async (ip) => {
    try {
        const response = await fetch(
            `https://geo.ipify.org/api/v1?apiKey=at_0z40R5hMgN7ejpYAMajXJhL1bp4Uo&ipAddress=${ip}`
        );
        const data = await response.json();
        if (!response.ok)
            throw new Error("There was an error, please try again later");
        createResultObject(data);
    } catch (error) {
        console.error("Uh oh something went very wrong :(", error);
        throw error;
    }
};

const createResultObject = (data) => {
    state.ipInfo = data;
    state.queries.push(data.ip);
};
