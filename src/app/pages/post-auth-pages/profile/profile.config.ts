import { ApiRoutes } from "../../../shared/routes/api.routes";
import { ISelect } from "../../../interfaces";

export const locationConfig: ISelect = {
    api: ApiRoutes.location,
    placeholder: "Select Location",
    bindLabel: "name",
    bindValue: "id",
    control: "location",
    defalutValue: null,
}

export const timezoneConfig: ISelect = {
    api: ApiRoutes.timezone,
    placeholder: "Select Timezone",
    bindLabel: "name",
    bindValue: "id",
    control: "timezone",
    defalutValue: null
}

export const countryConfig: ISelect = {
    api: ApiRoutes.country,
    placeholder: "Select Country",
    bindLabel: "name",
    bindValue: "id",
    control: "country",
    defalutValue: null
}

export const stateConfig: ISelect = {
    api: ApiRoutes.state,
    placeholder: "Select State",
    bindLabel: "name",
    bindValue: "id",
    control: "state",
    defalutValue: null
}

export const cityConfig: ISelect = {
    api: ApiRoutes.city,
    placeholder: "Select City",
    bindLabel: "name",
    bindValue: "id",
    control: "city",
    defalutValue: null
}