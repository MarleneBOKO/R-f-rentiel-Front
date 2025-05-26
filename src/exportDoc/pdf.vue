<template>
  <v-container fluid>
    <v-tabs>
      <v-tab>FORMULAIRE DE DECLARATION SINISTRE</v-tab>
      <v-tab>FICHE D'AVIS TECHNIQUE</v-tab>
      <v-tab-item key="1">
        <v-btn
          color="#061a40"
          class="mt-5 white--text"
          elevation="4"
          :loading="loading ? '#061a40' : null"
          rounded
          @click="generateReport()"
          >Imprimer sous format PDF</v-btn
        >
        <div id="document" ref="document">
          <section
            style="
                font-family: Arial, Helvetica, sans-serif;
                margin-left: 5px;
                margin-right: 5px;
              "
          >
            <div
              style="
                  font-family: Arial, Helvetica, sans-serif;
                  text-align: center;
                  margin: auto auto;
                  font-size: 10px;
                  padding-top: 5px;
                  padding-bottom: 5px;
                  color: #061a40;
                  margin-top: 5px;
                "
            >
              <h1>ATTESTATION DE DECLARATION</h1>
            </div>
            <p style="text-align:justify">
              CHER(E) CLIENT(E)<br /><br />
              Nous avons pris bonne note de votre déclaration de sinistre.<br /><br />
              Votre dossier enregistré sous le numéro
              <b>BJ202120012010209</b> sera donc traité avec diligence. Vous
              voudriez bien nous rappeler ce numéro dans toutes vos
              correspondances à ce sujet ou lors de votre visite à nos bureaux.
              <br /><br />
              Déclaration du <b>29/10/2021</b><br />
              <br />
              Merci.
            </p>
            <div
              style="
                  font-family: Arial, Helvetica, sans-serif;
                  text-align: center;
                  margin: auto auto;
                  font-size: 10px;
                  background-color: #061a40;
                  padding-top: 5px;
                  padding-bottom: 5px;
                  color: white;
                  margin-top: 5px;
                "
            >
              <h1>FICHE DE DECLARATION SINISTRE</h1>
            </div>
            <table
              style="
                  font-family: Arial, Helvetica, sans-serif;
                  border-collapse: collapse;
                "
              border="1"
            >
              <tbody>
                <tr>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    N° sinistre
                  </td>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                      "
                  >
                    22125555652
                  </td>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Nom Rédacteur
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                  >
                    HINSON Elias
                  </td>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Date survenance
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                  >
                    22/02/2366
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Client
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                  >
                    BALOGOUN Fulbert
                  </td>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Effet
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                  >
                    25/05/2385
                  </td>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Echéance
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                  >
                    22/02/2366
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Objet Sinistré
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                  >
                    Voiture
                  </td>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    PSAP
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                  >
                    95000
                  </td>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Date déclaration
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                  >
                    22/02/2366
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    N° Police
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                  >
                    2020114455
                  </td>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Avenant
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                  >
                    Automobile
                  </td>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Branche
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                  >
                    Mono
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Garantie
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                  >
                    Tout risque
                  </td>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Nom du conducteur
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                  >
                    BABATOUNDE
                  </td>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Numéro du conducteur
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                  >
                    65221144
                  </td>
                </tr>
                <tr>
                  <th
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                    colspan="8"
                  >
                    CIRCONSTANCES DETAILLEES DU SINISTRE
                  </th>
                </tr>
                <tr>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 20px;
                        text-align: center;
                        text-align:justify;
                      "
                    colspan="8"
                  >
                    Jai quiter Kpawou et pui GBRA Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Voluptates saepe animi quis
                    reprehenderit ipsam et exercitationem corrupti commodi. Sit,
                    atque quae. Quidem blanditiis reprehenderit, pariatur
                    tenetur illum cumque illo voluptatibus.
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Dommage matériels assuré
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                    colspan="2"
                  >
                    25000
                  </td>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Dommage Corporels Assurées
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                    colspan="2"
                  >
                    30000
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Dommage matériels Tiers
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                    colspan="2"
                  >
                    25000
                  </td>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 5px;
                        width: 16%;
                        font-weight: bolder;
                      "
                  >
                    Dommage Corporels Tiers
                  </td>
                  <td
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                    colspan="2"
                  >
                    30000
                  </td>
                </tr>
                <tr>
                  <th
                    style="font-family: Arial, Helvetica, sans-serif; padding: 10px"
                    colspan="8"
                  >
                    Observation et détailles de la déclaration
                  </th>
                </tr>
                <tr>
                  <td
                    style="
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 20px;
                        text-align: center;
                        text-align:justify;
                      "
                    colspan="8"
                  >
                    Jai quiter Kpawou et pui GBRA Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Voluptates saepe animi quis
                    reprehenderit ipsam et exercitationem corrupti commodi. Sit,
                    atque quae. Quidem blanditiis reprehenderit, pariatur
                    tenetur illum cumque illo voluptatibus.
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </v-tab-item>
      <v-tab-item key="2"></v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import html2pdf from "html2pdf.js";

export default {
  name: "app",
  methods: {
    exportToPDF() {
      html2pdf(this.$refs.document1, {
        margin: 0.2,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      });
    },
  },
};
</script>

<style>
#pdf {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
