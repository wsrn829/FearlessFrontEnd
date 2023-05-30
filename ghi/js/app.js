function createCard(name, description, pictureUrl, starts, ends, location) {
return `
    <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
      <div class="card">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
        </div>
            <div class="card-footer">
            <small class="text-muted">${starts}-${ends}</small>
            </div>
        </div>
    </div>
    `;
  }

window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Figure out what to do when the response is bad
        console.error("The response was bad");
      } else {
        const data = await response.json();

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const startsDate = new Date(details.conference.starts);
            const starts = startsDate.getMonth() + "/" + startsDate.getDate() + "/" + startsDate.getFullYear();
            const endsDate = new Date(details.conference.ends);
            const ends = endsDate.getMonth() + "/" + startsDate.getDate() + "/" + startsDate.getFullYear();
            const name = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const location = details.conference.location.name;
            const html = createCard(name, description, pictureUrl, starts, ends, location);
            const column = document.querySelector('.row-cols-3');
            column.innerHTML += html;
          }
        }
      }
    } catch (e) {
      console.log("error: ", e);
    }
  });
