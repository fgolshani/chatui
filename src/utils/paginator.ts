import { TableConfig } from "@/components/Base/TableContainer/TableContainer";
import { Vue } from "vue-property-decorator";

type PaginatorConfig = {
    callback: PaginationCallback;
    table: TableConfig;
    skipFirst?: boolean;
    peristant?: {
        host: Vue;
    };
}
export class Paginator {
    private firstQuery: PaginatorConfig["table"]["pagination"] = null;
    private _additionalFilters: Record<string, any> = {};
    private pushOnStack = true;

    constructor(private config: PaginatorConfig) {
        this.config.table.events["request"] = (input: ClientPaginationType) => this.request(input)
        this.config.table.events["filter"] = (input: Record<string, any>) => this.setAndRequest(input)
        this.firstQuery = this.getQueryParams()

        if (!this.config.skipFirst)
            this.request()

        if (this.config.peristant) {
            const { host } = this.config.peristant
            this.pushOnStack = false;
            host.$watch(() => host.$route.query, ({ page, row }) => {
                const paginationPage = this.config.table.pagination.page.toString()
                const paginationRow = this.config.table.pagination.rowsPerPage.toString()
                if (page == paginationPage && row == paginationRow) return;
                this.pushOnStack = false;
                this.config.table.pagination.page = +page
                this.config.table.pagination.rowsPerPage = +row
                this.request()
            })
        }
    }

    public get additionalFilters(): Record<string, any> {
        return this._additionalFilters;
    }
    public set additionalFilters(value: Record<string, any>) {
        this.setAndRequest(value)
    }

    private setAndRequest(input: Record<string, any>) {
        this._additionalFilters = input;
        this.request();
    }

    private getQueryParams() {
        const result = this.config.table.pagination
        const { page, row } = Vue.$router.currentRoute.query
        if (page && row) {
            result.page = +page
            result.rowsPerPage = +row
        }
        return result
    }

    private addQueryParams() {
        const methodName: "push" | "replace" = this.pushOnStack ? "push" : "replace";

        Vue.$router[methodName]({
            query: {
                page: this.config.table.pagination.page.toString(),
                row: this.config.table.pagination.rowsPerPage.toString(),
            }
        })
            .catch(() => null)

        this.pushOnStack = true;
    }


    async request(serverInput: ClientPaginationType = { pagination: this.config.table.pagination }) {
        this.config.table.loading = true;
        try {
            const serverPagination: ServerPaginationType = {
                paginationInfo: {
                    page: serverInput.pagination.page,
                    limit: serverInput.pagination.rowsPerPage
                }
            }

            const { queryList, totalItemCount } = await this.config.callback({ ...serverPagination, ...this.additionalFilters });
            this.config.table.data = queryList
            this.config.table.pagination = {
                ...serverInput.pagination,
                rowsNumber: totalItemCount
            }
            if (this.config.peristant)
                this.addQueryParams()
        }
        catch (err) { }
        this.config.table.loading = false;
    }

    reset() {
        this.config.table.pagination = this.firstQuery
    }

}

type ClientPaginationType = {
    pagination: {
        descending?: boolean;
        rowsNumber?: number;
        sortBy?: any;
        page: number;
        rowsPerPage: number;
    };
}

type ServerPaginationType = {
    paginationInfo: {
        page: number;
        limit: number;
    };
}

type PaginationCallback = (input: ServerPaginationType) => Promise<any>