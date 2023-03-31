import {ConfirmOptions} from "material-ui-confirm";

async function confirmWrapper(
    confirm: (options?: (ConfirmOptions | undefined)) => Promise<void>,
    options?: (ConfirmOptions | undefined)
): Promise<boolean> {
    try {
        await confirm(options);
        return true;
    } catch (_) {
        return false;
    }
}

export default {confirmWrapper};