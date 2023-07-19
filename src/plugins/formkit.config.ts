import { genesisIcons } from "@formkit/icons"
import type { DefaultConfigOptions } from '@formkit/vue'
import { createInput } from '@formkit/vue'
import { createProPlugin, inputs } from '@formkit/pro'
import PermissionsInput from "@/components/PermissionsInput.vue"
import { } from '@formkit/vue'
import '@formkit/pro/genesis'
import "@formkit/themes/genesis"

const pro = createProPlugin(import.meta.env.VITE_FORMKIT_TOKEN, inputs)

const isCheckboxAndRadioMultiple = (node: any) => (node.props.type === 'checkbox' || node.props.type === 'radio') && node.props.options
function addAsteriskPlugin(node: any) {
    node.on('created', () => {
        const isRequired = node.props.parsedRules.some((rule: any) => rule.name === 'required');
        if (!isRequired) return

        const isMultiOption = isCheckboxAndRadioMultiple(node)
        node.props.definition.schemaMemoKey = `required_${isMultiOption ? 'multi_' : ""}${node.props.definition.schemaMemoKey}`
        const schemaFn = node.props.definition.schema;
        node.props.definition.schema = (sectionsSchema: any = {}) => {
            if (isRequired) {
                if (isMultiOption) {
                    sectionsSchema.legend = {
                        children: ['$label', '*']
                    }
                } else {
                    sectionsSchema.label = {
                        children: ['$label', '*']
                    }
                }
            }
            return schemaFn(sectionsSchema);
        }
    })
}
function scrollToErrors(node: any) {
    if (node.props.type === 'form') {
        const scrollTo = (node: any) => {
            const el = document.getElementById(node.props.id);
            if (el) {
                el.scrollIntoView();
            }
        };

        const scrollToErrors = () => {
            node.walk((child: any) => {
                // Check if this child has errors
                if (child.ledger.value('blocking') || child.ledger.value('errors')) {
                    // We found an input with validation errors
                    scrollTo(child);
                    // Stop searching
                    return false;
                }
            }, true);
        };

        const onSubmitInvalid = node.props.onSubmitInvalid;
        node.props.onSubmitInvalid = () => {
            onSubmitInvalid(node);
            scrollToErrors();
        };
        node.on('unsettled:errors', scrollToErrors);
    }
    return false;
}
const config: DefaultConfigOptions = {
    plugins: [pro, addAsteriskPlugin, scrollToErrors],
    inputs: {
        permissions: createInput(PermissionsInput, {
            props: ['permissions'],
        }),
    },
    icons: { ...genesisIcons },

}

export default config
