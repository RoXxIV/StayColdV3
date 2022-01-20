<template>
  <section>
    <h1>Mentions légales</h1>
    <h2>
      Vous êtes actuellement connecté sur le site Internet <span>StayCold</span>
    </h2>

    <ul>
      <li>
        <h3>Hébergement</h3>
        <p>
          Le prestataire assurant l'hébergement du site est : Heroku, Inc. dont
          le siège social est au 650 7th Street San Francisco, CA 94103.
        </p>
      </li>
      <li>
        <h3>Conception et réalisation</h3>
        <p>
          L'accès au site et son utilisation sont réservés à un usage
          strictement personnel. Vous vous engagez à ne pas utiliser ce site et
          les informations ou données qui y figurent à des fins commerciales,
          politiques, publicitaires et pour toute forme de sollicitation
          commerciale et notamment l'envoi de courriers électroniques non
          sollicités.
        </p>
      </li>
      <li>
        <h3>Données personnelles</h3>
        <p>
          <span>StayCold</span> s'engage à faire ses meilleurs efforts pour
          assurer la confidentialité de toute information personnelle fournie
          via les differents formulaires. Toutefois les utilisateurs conviennent
          expressément que les messages ainsi transmis peuvent être interceptés
          sur le réseau. Jusqu'à ce qu'ils nous parviennent, leur
          confidentialité ne peut être garantie et <span>StayCold</span> ne
          saurait être tenue responsable en cas de perte ou dommage résultant
          d'une éventuelle interception.
        </p>
        <p>
          En application des articles 39 et suivants de la loi du 6 janvier 1978
          modifiée (1), vous bénéficiez d’un droit d’accès et de rectification
          aux informations qui vous concernent. Si vous souhaitez exercer ce
          droit et obtenir communication des informations vous concernant,
          veuillez-vous adresser à <span>StayCold</span> via le formulaire de
          contact
        </p>
      </li>
      <li>
        <h3>Responsabilité</h3>
        <p>
          L'ensemble des informations accessibles via ce site est fourni en
          l'état.
        </p>
        <p>
          <span>StayCold</span> ne donne aucune garantie, explicite ou
          implicite, et n'assume aucune responsabilité relative à l'utilisation
          de ces informations.<span>StayCold</span> se réserve le droit de
          modifier à tout moment les présentes notamment en actualisant ce site.
          <span>StayCold</span> ne pourra être responsable pour quelque dommage
          que ce soit tant direct qu'indirect, résultant d'une information
          contenue sur ce site.
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "Legal-notices",
  title: "Mentions légales",
};
</script>

<style lang="scss" scoped>
section {
  width: 75%;
  margin: auto;
  span {
    color: $blue;
  }
}
</style>
