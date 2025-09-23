Website: https://modularresume.com/

This is a web application designed to streamline the process of making not just one resume, but many.

I had 3 main goals before I started building this.

I wanted to be able to:

1. Be able to edit the document (or in this case, a 1:1 visual representation of the document, since what we're interacting with it HTML/CSS and the document output is PDF)
2. Move any section around by dragging it.
3. Have any information I wrote automatically save into a dropdown for re-use later on.

Being able to edit the document was important to me because, while editing a form input off to the side can work well, I think it just feels better to see text directly in the area you're typing. Since it's mostly HTML <input> tags, we get all the benefits of things like being able to save data but we also get the benfit and feeling of working directly in the document.

Moving sections around was a must because I ran into occasions where I'd use certain templating sites, and then I'd want to change something but the template wouldn't allow me to go back and change something in the middle without restarting from scratch or greatly affecting the layout.

Initially, I was only thinking about bullet points for that 3rd goal, but I ended up expanding that to all sections. The custom dropdown component in this just renders the actual sections themselves in a scrollable list. I initially went with a normal dropdown, which worked well for bullet points, but then I ran into the problem of "What do you show in a dropdown for something that has 4 or 5 fields, like a person's name, their links, and their profession?" So the solution was to just render the component. Doing this also made it make sense to add in filtering across multiple fields. So if you are looking at work experience sections you've made in the past, then you can search in the text input any word that showed up in the company name, your title at that work place, or the location of the job and the dropdown will filter to only include jobs which match that text in one of the fields.

There are some oddball decisions in the code, especially if you look at the wrapper components that have both a relative and absolute div in them. Ideally, the absolutely positioned UI icons, like the delete button, the duplicate button, and the underline button, would have all shared a relative container with their component displays. I tried this and, while it looked great, it completely destroyed how the PDF render order occurred, which confuses ATS resume parsers. So, for example, if I were to wrap one section in a relative container, there's no telling if the PDF would respect its order in the DOM tree or if it would decide it should be at the end of the document. The funny thing is that, visually, to a human, the PDF would look perfect, but if you copy pasted the PDF text content into a word doc you'd see the text order would be different than what we see visually. That's why I was careful not to stick any positioned wrappers around content that the PDF output would contain. The workaround was to create those RelativeAbsolute wrapper components that sit just outside of the content. It's quirky but it works to not get odd results, thus keeping the PDF output ATS/Parser friendly.

Future goals with this: I'd like to make this mobile friendly, and I think some of the sections like Education could use a little bit of refinement.
