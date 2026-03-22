import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Logistik & Lager',
      items: [
        'logistik-lager/SOP_LOG-01',
        'logistik-lager/SOP_LOG-02',
        'logistik-lager/SOP_LOG-03',
      ],
    },
    {
      type: 'category',
      label: 'Einkauf & Lieferanten',
      items: [
        'einkauf-lieferanten/SOP_EINK-01',
        'einkauf-lieferanten/SOP_EINK-02',
      ],
    },
    {
      type: 'category',
      label: 'Regulatorik & MDR',
      items: [
        'regulatorik-mdr/SOP_REG-01',
        'regulatorik-mdr/SOP_REG-02',
        'regulatorik-mdr/SOP_REG-03',
        'regulatorik-mdr/SOP_REG-05',
      ],
    },
    {
      type: 'doc',
      id: 'sap-universe',
      label: 'SAP Universum',
    },
  ],
};

export default sidebars;