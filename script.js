document.addEventListener('DOMContentLoaded', () => {
    const surveyForm = document.getElementById('survey-form');
    const successMessage = document.getElementById('success-message');
    const surveyHeader = document.querySelector('header');

    surveyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // N8N Webhook Configuration (Secure Proxy)
        // Todas las credenciales críticas (Airtable PAT, Base ID, etc.) 
        // están ahora protegidas dentro de n8n.
        const N8N_WEBHOOK_URL = 'https://alxlca.app.n8n.cloud/webhook/517c54b1-cc94-48ce-a7b2-dda8ab703614';

        const submitButton = document.getElementById('submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        // Recopilar datos
        const formData = new FormData(surveyForm);
        const fields = {
            'id_estudiante': formData.get('id_estudiante'),
            'nivel_satisfaccion': parseInt(formData.get('nivel_satisfaccion')),
            'claridad_contenido': parseInt(formData.get('claridad_contenido')),
            'aplicabilidad_practica': parseInt(formData.get('aplicabilidad_practica')),
            'comentarios_adicionales': formData.get('comentarios_adicionales')
        };

        try {
            console.log('Enviando datos a n8n (Proxy seguro)...');

            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
            });

            if (!response.ok) {
                throw new Error('No se pudo procesar la encuesta. Por favor, reintenta.');
            }

            console.log('Encuesta procesada exitosamente.');

            // Animación de salida del formulario
            surveyForm.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            surveyForm.style.opacity = '0';
            surveyForm.style.transform = 'translateY(-20px)';

            surveyHeader.style.transition = 'opacity 0.5s ease';
            surveyHeader.style.opacity = '0';

            setTimeout(() => {
                surveyForm.style.display = 'none';
                surveyHeader.style.display = 'none';

                // Mostrar mensaje de éxito con animación
                successMessage.style.display = 'block';
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';

                // Forzar reflow
                successMessage.offsetHeight;

                successMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 500);

        } catch (error) {
            console.error('Error de seguridad/red:', error);
            alert('Error al enviar: ' + error.message);
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Encuesta';
        }
    });
});
