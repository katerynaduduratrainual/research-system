---
url: https://aclanthology.org/2026.unlp-1.12.pdf
title: Toward a Gold-Standard Benchmark for Evaluating Ukrainian Language Proficiency in LLMs
fetched: 2026-10-08
added_by: scout
source: S-79b8e1ee
---

Toward a Gold-Standard Benchmark for Evaluating Ukrainian Language
                        Proficiency in LLMs
                           Svitlana Galeshchuk2,3 , Yuliia Maksymiuk4 ,
                           Yuliia Chernobrov1 , Oleksandra Antoniv5 ,
                      Nina Stankevych5 , Nataliia Faryna5 , Oksana Popkova6

               1 National Commission for State Language Standards, 2 BNP Paribas,
                   3 West Ukrainian National University, 4 Independent researcher,
               5 Ivan Franko National University of Lviv, 6 Kherson State University

                                    Correspondence: y.chernobrov@mova.gov.ua
                      Abstract                              benchmark is developed by professional linguists
                                                            and focuses on grammar (with particular empha-
    The paper presents an expert-curated bench-
    mark for assessing Ukrainian proficiency in
                                                            sis on morphology and syntax), vocabulary, and
    LLMs, focusing on grammar, lexical norms,               orthography. Using this benchmark, we test a
    and orthography as core components of lan-              range of widely used closed- and open-source
    guage competence. Prepared by professional              models, including Mistral Medium and Small,
    linguists, the proposed gold-standard dataset is        GPT-OSS-120B, Gemma 3 (4B and 12B), the
    designed to test normative Ukrainian usage.             Llama family of models, as well as models fur-
    The benchmark is further used to evaluate a             ther pre-trained for Ukrainian, namely MamayLM
    range of LLMs, including Ukrainian-focused,             and Lapa. Our evaluation reveals systematic weak-
    multilingual, and large-scale models, under             nesses across multiple linguistic patterns and persis-
    zero-shot and few-shot prompting in Ukrainian           tent challenges in Ukrainian language processing.
    and English. Across these settings, smaller mod-
    els achieve no more than 42.1% accuracy, while             The paper is organized as follows. Section 2
    large-scale LLMs reach up to 59.6%. These               describes the benchmark and its development, in-
    results show that standard Ukrainian remains            cluding its linguistic coverage and construction prin-
    challenging for current LLMs and highlight the          ciples. Section 3 reviews related work on Ukrainian
    need for stronger language-specific evaluation          language benchmarks. Section 4 presents the exper-
    and adaptation.                                         imental setup, including evaluation metrics, mod-
1   Introduction                                            els, and prompting design. Section 5 reports the
                                                            main results and discusses performance differences
Large language models (LLMs) are increasingly               across models. Section 6 outlines the limitations of
trained on multilingual datasets, but the majority of       the current study and suggests directions for future
pre-training data usually consists of English texts.        work. Section 7 summarises the main findings and
As a result, the ability of LLMs to process under-          argues for the importance of the benchmark.
represented languages such as Ukrainian remains
difficult to assess reliably. This issue is especially      2   Benchmark Development
important given the growing adoption of Artifi-
cial Intelligence (AI) systems employing language           The grammar test tasks proposed by the authors
models by Ukrainian users. Can we claim that                aim to assess language competence (Latin compe-
these or other closed- or open-source models are            tens – proper, appropriate), meaning knowledge of
truly fluent in Ukrainian and capable of generating         the norms of the modern standard language and
grammatically correct sentences?                            the ability to use them skillfully in context. The
   In human language assessment, proficiency is             benchmark targets, in particular, grammatical and
typically evaluated through standardized examina-           orthographic competence at the level expected of
tions comprising multiple tests designed to measure         native speakers. The benchmark was created by
different aspects of language competence. We adopt          professional philologists and linguists with 10 to 30
a similar perspective for evaluating LLMs and frame         years of experience teaching Ukrainian language
the task as a benchmark-based assessment.                   courses at higher education institutions. In addition,
   Specifically, we present an expert-curated dataset       each question was reviewed by at least one other
of 347 multiple-choice questions designed to evalu-         expert for correctness and clarity. Test items found
ate Ukrainian language proficiency in LLMs. The             to be ambiguous or insufficiently comprehensive
                                                        121
        Proceedings of the Fifth Ukrainian Natural Language Processing Conference (UNLP 2026), pages 121–135
                            May 29-30, 2026 ©2026 Association for Computational Linguistics
were revised or removed.
   The Ukrainian grammar test items were com-
piled from a broad range of normative and refer-
ence sources, including (Matsiuk and Stankevych,
2017), (Serbenska, 2019), (Voloshchak, 2007),
(Maznichenko et al., 2019). These sources were
selected because they provide extensive coverage
of grammatical phenomena, reflect the norms of
standard Ukrainian, and document their historical
development.
   The presented benchmark contains 347 multiple-
choice questions with either four or five answer
options. Each question targets a specific gram-
                                                        Figure 1: Distribution of correct answer positions across
matical, lexical, or orthographic phenomenon and
                                                        the five answer choices (A corresponds to 0, while the
includes one correct answer consistent with the         Ukrainian letter Д (equivalent to D) corresponds to 4).
norms of standard Ukrainian together with plausi-       The red dashed line indicates the expected count under
ble distractors but non-normative alternatives.         a uniform distribution. Most positions are close to the
                                                        expected frequency, while position 4 appears somewhat
2.1 Benchmark Overview                                  underrepresented.
This subsection describes the main properties of the
proposed benchmark and the linguistic phenomena
it covers. The grammar tests pay special attention
to forms in which native speakers of Ukrainian
often make mistakes due to negative interference
(examples are provided where differences at the
morphological and syntactic levels exist among
various Slavic languages). LLMs are expected to
clearly distinguish these languages and recognize
the inherent features of Ukrainian. Each LLM is
asked to analyze individual words as well as word
combinations or sentences.                              Figure 2: Distribution of question lengths in the bench-
   The tasks are formulated as questions that specify   mark, measured by number of words per question. The
the essence of the possible error. A positive feature   red dashed line marks the mean question length.
of the test tasks is the use of both appellative and
onymic vocabulary, as well as the identification of
the most common grammatical mistakes. Figure 1          and producing texts in various fields of professional
shows the distribution of correct answer positions      activity. It includes:
across the benchmark. The answers are relatively
balanced overall, although the fifth appears less       1. Morphology. This category includes nouns,
frequently because only a subset of items has five      adjectives, numerals, pronouns, and verbs. The
answer choices.                                         benchmark covers such phenomena as genitive case
   Figure 2 shows the distribution of question          endings -a (-ia) / -u (-iu) (Ukrainian: -а(-я)/-
lengths, measured in number of words per question.      у(-ю)) in masculine singular nouns, instrumental
   The questions cover three broad linguistic cat-      and vocative case endings, genitive plural endings,
egories: grammar (morphology, syntax), lexical          singular and plural forms of nouns, gender forms of
norms, and orthography. Grammatical compe-              invariable foreign origin nouns and abbreviations,
tence refers to the knowledge and ability to use        comparative and superlative forms of adjectives, the
the grammatical resources of the Ukrainian lan-         combination of numerals with nouns, case forms
guage, including word-formation units, methods of       of numerals, the use of numerals to indicate time,
word formation, morphological units, categories         normative use of pronouns, personal verb forms,
and forms, as well as syntactic units and categories.   future tense forms, imperative forms, and standard
This competence is necessary for understanding          verb forms such as participles and gerunds.
                                                    122
2. Syntax. This category includes both word-            professionally corrected and annotated by expert
level combinations and sentence-level syntax. At        linguists.
the word-combination level, the benchmark covers           The ZNO benchmark (Romanyshyn et al., 2024)
prepositional government, nonprepositional gov-         is a multiple-choice question resource derived from
ernment, and complex cases of agreement. At             the Ukrainian External Independent Evaluation
the sentence level, it includes detached adverbial      (Zovnishnie nezalezhne otsiniuvannia, ZNO), the
modifiers expressed by participial phrases, series of   standardized exam used for university admissions
homogeneous sentence parts, agreement of the sub-       in Ukraine. It contains machine-readable questions
ject with the predicate, and norms for constructing     and correct answer labels across two subject areas:
complex sentences.                                      Ukrainian language and literature, and History of
                                                        Ukraine. The resource is provided in .jsonl for-
Vocabulary. This category covers lexical norms          mat, where each entry consists of a question prompt,
and normative word usage. It includes questions         a set of answer options (A–D/E), the correct an-
on the semantic compatibility of words in word          swer, and a subject label. It comprises around 3,800
combinations, distinctions between near-synonyms,       question-answer pairs from exams administered be-
and the selection of words appropriate to the mean-     tween 2006 and 2023.
ing intended in context. These items target cases          Compared with ZNO, our benchmark is narrower
where incorrect usage often arises from semantic        in scope but more focused on normative grammat-
interference, calques, or confusion between similar     ical competence. Some items in our benchmark,
lexical items.                                          especially morphology tasks, overlap with aspects
Orthography. This category includes questions           covered by ZNO, while syntax-oriented questions
targeting the norms of standard Ukrainian spelling      extend the evaluation toward phenomena examined
and related orthographic conventions.                   in greater detail in higher education Ukrainian lan-
   Representative examples for all major categories     guage courses. Compared with UA-GEC, which
are provided in Appendix A.                             is centered on error correction in running text, our
                                                        benchmark provides a controlled multiple-choice
3   Related Work                                        format for targeted evaluation of grammatical and
                                                        orthographic knowledge.
Currently, there is no universally accepted stan-          The methodological value of our benchmark lies
dard for evaluating Ukrainian language proficiency      in its role as a concentrated expert-curated eval-
in large language models. Existing Ukrainian-           uation resource of normative grammatical forms
language benchmarks can be broadly categorized          and in its focus on the most challenging areas of
into three types: (i) resources translated from other   Ukrainian grammar.
languages and subsequently validated for annota-
tion errors (Saini et al., 2024); (ii) synthetically    4     Experimental Setup
generated benchmarks (Bondarenko et al., 2023);
and (iii) corpora curated by human annotators and       4.1    Task Definition
released as silver- or gold-standard resources.         Each benchmark item is formulated as a multiple-
   Our benchmark belongs to the gold-standard           choice question with four or five candidate options
category, as it has been carefully constructed and      and exactly one correct answer. The task for the
verified by domain experts following a rigorous         model is to identify the option that conforms to the
annotation protocol. In this work, we therefore         norms of standard Ukrainian grammar or orthogra-
focus primarily on resources that are methodologi-      phy.
cally and qualitatively comparable to ours, namely         We treat this benchmark as a multiple-choice
UA-GEC and ZNO.                                         classification task. For each question 𝑞 𝑖 , the model
   UA-GEC (Syvokon et al., 2023) is designed to         is given a finite set of candidate answers A𝑖 =
support research in grammatical error correction        {𝑎 𝑖1 , . . . , 𝑎 𝑖𝐾𝑖 }, where 𝐾𝑖 ∈ {4, 5}, and must select
and related tasks. It is an annotated corpus of texts   the correct option 𝑎 ∗𝑖 . Unlike standard classification
containing grammatical errors and fluency issues,       tasks such as sentiment analysis, the answer labels
compiled from writings produced by both native          do not carry fixed semantic meaning across items;
and non-native speakers of Ukrainian. In total, the     the task is therefore to choose the correct option
corpus comprises 1,872 documents that have been         from the alternatives provided.
                                                      123
4.2 Evaluation Metrics                                       4.3   Hardware
We evaluate model performance in two settings.               The experiments are conducted on a GPU
In the first, the model scores the available answer          server using a single 96 GB GPU (gpu_1x_96gb).
options and the highest-scoring option is selected.          vLLM v0.10.1.1 serves as the inference backend
In the second, the model generates an answer in              and LightEval v0.13.1.dev0 as the evaluation frame-
text form. In both settings, we use accuracy as the          work, running on Python 3.13.12.
main evaluation metric.
   Let 𝑁 be the total number of questions, let 𝑞 𝑖 be        4.4   Models
the 𝑖-th question, let A𝑖 = {𝑎 𝑖1 , . . . , 𝑎 𝑖𝐾𝑖 } be the   We evaluate models from four groups; the full list
set of answer options for that question, and let 𝑎 ∗𝑖        is provided in Appendix D.
be the correct answer.
                                                             Ukrainian-focused models. MamayLM (4B
4.2.1 Log-Likelihood Accuracy                                and 12B) (Yukhymenko et al., 2025) are Gemma 3
In the log-likelihood setting, the model assigns a           models further pre-trained and fine-tuned on
score to each answer option given the question.              Ukrainian datasets. Lapa-12B (lap) is also a
The predicted answer is the option with the highest          Ukrainian-adapted Gemma 3 model, tested in both
score:                                                       base and instruction-tuned variants.
           𝑎ˆ LL
              𝑖 = arg max log 𝑃 𝜃 (𝑎 | 𝑞 𝑖 ).                Smaller multilingual models. We include
                       𝑎∈ A𝑖
                                                             Gemma 3 (1B, 4B, 12B), Llama 3.1-8B, Phi-
   Log-likelihood accuracy is then defined as                4-Mini (3.8B), and Qwen3-8B in reasoning mode.
                      1 ∑︁  LL
                         𝑁
                                                            The latter is scored with extractive match only, as
            AccLL =         1 𝑎ˆ 𝑖 = 𝑎 ∗𝑖 ,                  its chain-of-thought outputs are incompatible with
                      𝑁 𝑖=1
                                                             log-likelihood evaluation.
where 1[·] equals 1 if the predicted answer is cor-          Pretrained base models. To isolate the contri-
rect and 0 otherwise. This metric shows whether              bution of instruction tuning, we additionally in-
the model assigns the highest score to the correct           clude Gemma 3 4B PT, Gemma 3 12B PT, and
answer.                                                      Llama 3.1 8B PT, alongside Lapa 12B PT.
4.2.2 Exact Match
                                                             Large-scale multilingual models. We also eval-
In the generative setting, the model produces a              uated larger models with 24B parameters or more
text answer 𝑔𝑖 . Exact Match counts a prediction             on the proposed benchmark. These models are typ-
as correct only if the normalized output exactly             ically stronger on complex tasks and longer-context
matches the correct answer:                                  settings. In this group, we include GPT-OSS-120B,
               1 ∑︁                                        Mistral-Medium-2508, Mistral-Small-2506, and
                  𝑁
          EM =       1 norm(𝑔𝑖 ) = 𝑎 ∗𝑖 ,                    Llama-3.3-70B. All of these models are evaluated
               𝑁 𝑖=1
                                                             using the setup described in Section 4.
where norm(·) denotes simple normalization of the
generated answer.                                            4.5   Prompt Design
                                                             Recall from Section 1 that our goal is to assess
4.2.3 Extractive Match
                                                             core linguistic knowledge rather than conditioned
Models do not always return only the answer itself           behavior, hence, we restrict experimentation to a
and may generate additional text. To account for             standard prompt and vary only the prompt language.
this, we also report Extractive Match. This metric           Persona-based prompting (Tan et al., 2024) is also
first extracts the predicted answer from the gener-          not used, as it is unlikely to meaningfully improve
ated output and then compares it with the correct            grammatical competence but instead can lead to a
answer:                                                      superficial stylistic imitation. Moreover, prior work
                1 ∑︁                                       suggests that shorter prompts often lead to better
                   𝑁
           XM =       1 ext(𝑔𝑖 ) = 𝑎 ∗𝑖 ,                    performance, potentially because highly detailed in-
                𝑁 𝑖=1
                                                             structions can overconstrain model behavior (Wang
where ext(·) is a rule-based extraction function             et al., 2026). Research shows that some LLMs
implemented with regular expressions.                        might follow instructions in English better in the
                                                         124
A. PROMPT_EN You are answering a multiple-choice              excluded from the main LLM evaluation. We argue
question in Ukrainian about Ukrainian grammar and
orthography. Return: answer: ONLY the letter of the
                                                              that additional few-shot examples are unnecessary,
correct option (e.g., “А”, “Б”, “В”, “Г”, “Д”). Question:     as the primary role of prompt examples in our set-
{question} Options: {choices}.                                ting is to reinforce the instructions and constrain
B. PROMPT_UA Дай вiдповiдь на тестове запитання               the model’s output format. Unlike tasks involving
українською мовою з української граматики та                  domain-specific classes, our multiple-choice setting
орфографiї. Вкажи: Вiдповiдь: ЛИШЕ лiтеру
правильної вiдповiдi (наприклад, “А”, “Б”, “В”, “Г”,          only requires the model to select among predefined
“Д”). Запитання: {question} Варiанти: {choices}.              answer options denoted by letters. Furthermore,
C. PROMPT_UA_TRANSLIT Dai vidpovid na testove                 adding more examples increases prompt length and
zapytannia ukrainskoiu movoiu z ukrainskoi hramatyky ta       may introduce long-context effects that negatively
orfohrafii. Vkazhy: Vidpovid: LYSHE literu pravylnoi
vidpovidi (napryklad, “A”, “B”, “V”, “H”, “D”).
                                                              affect performance.
Zapytannia: {question} Varianty: {choices}.
                                                                  Ex1 Q: У родовому вiдмiнку однини закiнчення -у (-ю)
                                                                  мають усi iменники в рядку. A) ансамбль, фольклор, Дон,
Figure 3: English, Ukrainian, and transliterated                  дуб; Б) Буг, роман, Кавказ, мiшок; В) Сибiр, зошит, дощ,
Ukrainian prompt templates used in the experiments.               оркестр; Г) снiг, ураган, бiль, понедiлок; Д) гнiв, Амур,
                                                                  сюжет, полк. A: Д

                                                                  Ex2 Q: У родовому вiдмiнку однини закiнчення -у (-ю)
                                                                  мають усi iменники в рядку. A) автобус, хокей, шовк,
tasks of emotion detection (Dementieva et al., 2025),             жаль; Б) вальс, центнер, народ, вiдсоток; В) сум, iнститут,
                                                                  мiст, будинок; Г) футбол, унiверситет, розрив, апарат
(De Bruyne et al., 2022). We therefore compare                    (президента); Д) гектар, кiлограм, вiтер, гриб. A: Г

only English and Ukrainian prompt wording for                     Ex3 Q: У родовому вiдмiнку однини закiнчення -у (-ю)
                                                                  мають усi iменники в рядку. A) органiзм, легiт, рейд,
language proficiency as well. This comparison is                  цемент; Б) спосiб, ясен, поле, лiс; В) трактор, метр, колiр,
not fully controlled in the few-shot setting, since               Лондон; Г) реалiзм, лозунг, рис, космос; Д) нуль, ситець,
                                                                  лiтр, мiльйон. A: А
the in-context examples are in Ukrainian.                         Ex4 Q: У родовому вiдмiнку однини закiнчення -а (-я)
   We evaluate models in a zero-shot setting using                мають усi iменники в рядку. A) вокзал, атом, атлас, мороз;
                                                                  Б) жираф, вересень, перпендикуляр, конус; В) патрiарх,
only task instructions that require the model to                  перелiг, театр, краєвид; Г) ерудит, Острог, край, овес; Д)
                                                                  материк, мiкроб, ведмiдь, поклик. A: Б
generate a single-letter answer. We also conduct a
                                                                  Ex5 Q: У родовому вiдмiнку однини закiнчення -а (-я)
few-shot evaluation to examine how performance                    мають усi iменники в рядку. A) медик, вечiр, комп’ютер,
                                                                  Берлiн; Б) тигр, понедiлок, прапор, рейс; В) прямокутник,
changes when example items are included in the                    пiдручник, кiлограм, барометр; Г) водоспад, Дунай, цирк,
prompt. This is particularly important for pretrained             задум; Д) егоїст, десяток, катод, порох. A: В

models, since following task instructions may be
                                                              Figure 4: Five few-shot examples used in the prompt.
more difficult for base models prior to fine-tuning;
                                                              All examples follow the same multiple-choice format
few-shot prompting therefore helps mitigate this              but differ in choices and the correct answer. English
bias.                                                         translation and transliteration are provided in Appen-
   However, sampling test items for few-shot evalua-          dices B and C
                                                                                              .
tion is not straightforward, as little research provides
clear guidance on best practices. Tang et al. (2025)
investigate how adding examples helps reduce am-              5      Results
biguity. They conclude that 5–20 examples is a
                                                              Table 2 reports results across all model groups.
sweet spot for the models used in our experiments,
                                                              Overall, performance stays below 43% for most
particularly LLaMA-3.1-8B and Gemma-3-4B. Us-
                                                              models, suggesting that standard Ukrainian mor-
ing more examples may lead to over-prompting
                                                              phology, syntax, and orthography are still challeng-
and performance degradation, potentially due to
                                                              ing for current LLMs, including models adapted
difficulties in handling longer contexts. They also
                                                              for Ukrainian. Among the larger models, Mistral-
identify three dominant sampling strategies: ran-
                                                              Medium-2508 reaches 46.7–49.1%, while GPT-
dom sampling, sampling similar questions with
                                                              OSS-120B is the strongest model overall, exceeding
TF-IDF, and sampling similar questions with se-
                                                              54% in several settings.
mantic embeddings (Tang et al., 2025). We chose
the second strategy and therefore employ five exam-           Ukrainian-focused vs. general multilingual mod-
ples consisting of almost identical questions, each           els. Lapa 12B IT is the strongest Ukrainian-
with different answer options and a different correct         focused model, reaching 42.1% XM in the 5-shot
answer. Figure 4 shows the five examples sampled              setting. MamayLM scores consistently lower de-
from the initial dataset, which were subsequently             spite sharing the same Gemma 3 base family. This
                                                            125
suggests that adaptation data and tuning strategy        Table 1: Distribution of question hardness in the dataset.
matter more than the underlying base model alone.
In the multilingual group, Gemma 3 12B IT is the                      Level        Count        %
strongest model and comes close to Lapa 12B IT                        Hard            70       20.1
in several settings, even though it is not fine-tuned                 Difficult       90       26.0
specifically for Ukrainian.                                           Medium          88       25.3
Results with large-scale models. The Ukrainian                        Easy            99       28.6
grammar proficiency of four instruction-tuned large-                  Total          347      100.0
scale language models—GPT-OSS-120B, Llama-
3.3-70B, Mistral-Medium-2508, and Mistral-Small-
2506—is evaluated using Extractive Match and             a few percentage points, but the effect of few-shot
Exact Match under zero-shot and few-shot set-            prompting is not consistent across model fami-
tings. Table 2 reports the results. GPT-OSS-120B         lies. For example, under English prompting, Ma-
achieves the best performance, with its highest          mayLM 4B IT improves from 30.1% to 35.5%
accuracy obtained in the zero-shot setting with En-      XM, while Lapa 12B IT improves from 38.9% to
glish instructions. Its accuracy decreases under         42.1%. The few-shot setting remains important
few-shot prompting. We hypothesise that this effect      for pretrained models as in-context examples help
may emerge from the multilingual nature of the           follow the required answer format.
prompt, where English instructions are combined
with Ukrainian examples. The drop in accuracy            Reasoning model behavior. Qwen3-8B (RSN)
is approximately 5 percentage points. However,           shows a clear gap between Extractive Match and
the gains from few-shot prompting for other large        Exact Match. Under Ukrainian 5-shot prompting,
models, such as Mistral-Medium-2508 and Mistral-         it reaches 34.3% XM but only 6.4% EM. This
Small-2506, are statistically insignificant. A similar   suggests that the model often includes the correct
pattern is observed across the other models we eval-     answer in its output but does not follow the required
uate. This finding supports our hypothesis stated        answer format. For this reason, XM appears to be
in the Experimental Setup: although prompting            the more suitable metric for this model.
examples may help guide the model toward the             LLaMA: Sensitivity to Instruction Language.
expected output format, they add limited value in        We observe that LLaMA-based model consistently
the MCQ setting, where the target classes (letters)      performs better when the task instructions are
do not carry semantic meaning.                           written in English rather than Ukrainian, even
   Per-question results are further used to assign       though the questions and answer options are still in
a hardness level to each test item. We categorize        Ukrainian.
question hardness according to the number of cor-           This does not necessarily mean that the model
rect generations out of four large-scale models as       has stronger Ukrainian language ability. A more
these models show the best overall accuracy. If          likely explanation is that it follows instructions more
no model answers a question it is labeled as hard,       reliably in English: it is more likely to produce the
those answered correctly by exactly one model are        required answer format and respect the multiple-
labeled difficult, those answered correctly by two       choice setup.
models medium, and those answered correctly by
three or four models easy. This discrete defini-         6   Limitations and Future Directions
tion avoids arbitrary thresholds and directly reflects
inter-model agreement. The resulting distribution        The following limitations and possible mitigation
is shown in Table 1. We suggest that hard and            strategies constitute future directions for improving
difficult questions are challenging because they in-     LLM evaluation on the proposed benchmark.
volve specific linguistic patterns or highly plausible
                                                         Prompt optimization. The current setup uses a
distractors that require more fine-grained Ukrainian
                                                         fixed prompt and five few-shot examples to ensure
proficiency.
                                                         consistency across model types. However, experi-
Effect of prompt language and few-shot exam-             ments with more prompts and their customization
ples. English and Ukrainian prompts lead to              for each model might better showcase its strengths
similar results for most models, usually within          (see (Khattab et al., 2024)), since models are trained
                                                     126
Table 2: Evaluation results on the proposed Ukrainian language benchmark (↑, all values in %). LL = log-likelihood
accuracy (zero-shot); XM = extractive match; EM = exact match. Generative results are reported in zero-shot (fs0)
and 5-shot (fs5) settings, each under English (en) and Ukrainian (uk) prompt language. Dashes indicate settings not
evaluated for a given model. Highlighted cells mark the best result per column within each model group.

                                               LL (zero-shot)     Extractive Match              Exact Match
                                                                     fs5             fs0               fs5
                Model                             en    uk      en         uk   en         uk   en           uk
                Ukrainian-focused models
                MamayLM 4B IT                  29.6    30.5     35.5   34.4 30.1 31.6 35.5               34.4
                MamayLM 12B IT                 37.5    36.3     39.1   38.1 37.1 34.6 39.1               38.1
                Lapa 12B IT                    38.7    37.6     42.1   41.1 38.9 38.4 42.1               41.1
                Lapa 12B PT                    35.0    31.0     38.4   38.6  –    –   38.4               38.6
                Smaller multilingual instruction-tuned models
                Gemma 3 1B IT                  23.2    27.5     21.7   22.1     21.7   21.3     21.7     22.1
                Gemma 3 4B IT                  25.6    33.6     28.5   32.9     26.2   33.9     28.5     32.9
                Gemma 3 12B IT                 36.2    35.8     36.3   37.0     37.6   36.2     36.3     37.0
                Phi-4-Mini IT                  26.0    27.0     24.8   27.2     25.2   26.9     19.6     24.5
                Llama 3.1 8B IT                29.9    25.4     30.1   29.6     31.6   27.3     30.1     29.6
                Pretrained base models
                Gemma 3 4B PT                  27.4    27.1     28.9 29.1        –         –    28.9     29.1
                Gemma 3 12B PT                 29.8    32.3     35.8 37.8        –         –    35.8     37.8
                Llama 3.1 8B PT                25.3    21.6     31.9 25.0        –         –    31.9     25.0
                Reasoning model
                Qwen3-8B (RSN)                    –      –      35.2 34.3 38.2 35.3 35.2                     6.4
                Large-scale multilingual models
                gpt-oss-120b                      –      –      55.0   55.2     59.6   54.7     55.0     55.2
                Meta-Llama-3.3-70B-Instruct       –      –      36.9   34.9     36.3   33.7     36.9     34.9
                mistral-medium-2508               –      –      48.5   49.1     46.7   47.2     48.5     49.1
                mistral-small-2506                –      –      37.2   41.0     34.3   38.6     33.5     39.4




                                                         127
on different data and with different architectural       handle the Ukrainian grammar and orthography
parameters.                                              and provides a basis for future work on Ukrainian
                                                         evaluation and model development. More broadly,
Reasoning models and log-likelihood evaluation.
                                                         our findings also highlight the importance of expert-
Reasoning models were not evaluated in the log-
                                                         designed benchmarks for underrepresented lan-
likelihood setup because their long thinking traces
                                                         guages. The dataset is also openly accessible to the
do not fit this scoring method well. Future work
                                                         community to advance further research in Ukrainian
could explore adapted evaluation protocols that
                                                         natural language processing (see ULP1 ).
would allow more direct comparison with other
model types.                                             Acknowledgments
Answer-label bias. Fixed answer labels such as           We would like to thank the Kyivstar team for testing
A/B/C/D may introduce label and positional bias.         our dataset within the Kyivstar evaluation frame-
Future work should test alternative label formats        work. We are also grateful to Denys Yurchenko for
and full-answer generation to reduce this effect         his helpful comments and suggestions.
(Nowak et al., 2026).
Generation size calibration. In the generative           References
setup, the maximum output length for standard
models was limited to 15 tokens. This is longer            Lapa llm. https://huggingface.co/lapa-llm/lap
                                                             a-12b-pt. Hugging Face repository.
than needed to produce a single answer letter, but it
makes it possible to capture cases where the correct     Maksym Bondarenko, Artem Yushko, Andrii Shportko,
answer appears later in the output. At the same time,     and Andrii Fedorych. 2023. Comparative study of
                                                          models trained on synthetic data for ukrainian gram-
longer generations increase the risk of extraction er-    matical error correction. In Proceedings of the Second
rors, since regex-based metrics may recover a letter      Ukrainian Natural Language Processing Workshop
that does not reflect the model’s final choice. Future    (UNLP), pages 103–113.
work should study this trade-off more systemati-         Luna De Bruyne, Pranaydeep Singh, Orphée De Clercq,
cally and determine a more principled generation           Els Lefever, and Véronique Hoste. 2022. How
limit for this type of benchmark.                          language-dependent is emotion detection? evidence
                                                           from multilingual bert. In Proceedings of the 2nd
7   Discussion and Conclusion                              Workshop on Multi-lingual Representation Learning
                                                           (MRL), pages 76–85.
We introduced an expert-curated benchmark for
                                                         Daryna Dementieva, Nikolay Babakov, and Alexander
evaluating Ukrainian language proficiency in large         Fraser. 2025. Emobench-ua: A benchmark dataset
language models. The benchmark contains 347                for emotion detection in ukrainian. In Findings of the
multiple-choice questions covering morphology,             Association for Computational Linguistics: EMNLP
syntax, vocabulary, and orthography.                       2025.
   Our results show that the benchmark is challeng-      Omar Khattab, Arnav Singhvi, Paridhi Maheshwari,
ing for current models. In most evaluated settings        Zhiyuan Zhang, Keshav Santhanam, Saiful Haq,
with smaller LLMs, performance remains below              Ashutosh Sharma, Thomas Joshi, Hanna Moazam,
                                                          Heather Miller, and 1 others. 2024. Dspy: compiling
43%, including for models adapted specifically for        declarative language model calls into state-of-the-art
Ukrainian. This suggests that general multilin-           pipelines. In International Conference on Learning
gual ability does not guarantee reliable knowledge        Representations, volume 2024, pages 54928–54958.
of Ukrainian grammar rules. Few-shot prompt-             Zoriana Matsiuk and Nina Stankevych. 2017. Ukrainska
ing helps mainly for pretrained models, and the            mova profesiinoho spilkuvannia. K.: Karavela.
choice of prompt language had little consistent ef-
                                                         Ye. I. Maznichenko, V. Ye. Makedon, S. V. Sharabanova,
fect. Large-scale models exhibit better performance        and I. L. Yalovnycha. 2019. Ykrainsky pravopus.
(GPT-OSS-120B, Mistral-Medium-2508) due to                 Kyiv: Instytut movoznavstva imeni O. O. Potebni
their improved training and capacity to detect com-        Natsionalnoi akademii nauk Ukrainy.
plex patterns. However, even the best-performing
                                                         Mateusz Nowak, Xavier Cadet, and Peter Chin. 2026.
model demonstrates maximum accuracy of approx-            Abcd: All biases come disguised. arXiv preprint
imately 60%.                                              arXiv:2602.17445.
   In conclusion, the benchmark offers a focused             1 https://huggingface.co/datasets/SGaleshchuk/
resource for evaluating how well language models         ULP-Ukrainian-Language-Proficiency

                                                     128
Mariana Romanyshyn, Oleksiy Syvokon, and Roman              A.1   Morphology
 Kyslyi. 2024. The unlp 2024 shared task on fine-
 tuning large language models for ukrainian. In Pro-        Nouns. Genitive case endings -а(я)/-у(ю) in
 ceedings of the Third Ukrainian Natural Language           masculine singular nouns.
 Processing Workshop (UNLP)@ LREC-COLING
 2024, pages 67–74.                                         У котрому рядку всi iменники в родовому
                                                            вiдмiнку однини мають закiнчення -у (-ю)? –
Aman Saini, Artem Chernodub, Vipul Raheja, and              а) трамвай, бiк, унiверситет, Буг; б) Днiпро,
 Vivek Kulkarni. 2024. Spivavtor: An instruction            вокзал, стан, садок; в) Рим, термiн, гiпс, со-
 tuned ukrainian text editing model. In Proceedings         няшник; г) мiст, дах, Днiстер, Сибiр.
 of the Third Ukrainian Natural Language Processing
                                                            English translation: In which row do all masculine
 Workshop (UNLP)@ LREC-COLING 2024, pages
 95–108.                                                    singular nouns take the genitive ending -u (-iu)?
                                                            Transliteration: U kotromu riadku vsi imennyky
Oleksandra Serbenska, editor. 2019. Antysurzhyk. Vchy-      v rodovomu vidminku odnyny maiut zakinchennia
  mosia vvichlyvo povodytys i pravylno hovoryty. Svit,      -u (-iu)? – a) tramvai, bik, universytet, Buh; b)
  Lviv. Navchalnyi posibnyk.                                Dnipro, vokzal, stan, sadok; v) Rym, termin, hips,
                                                            soniashnyk; h) mist, dakh, Dnister, Sybir.
Oleksiy Syvokon, Olena Nahorna, Pavlo Kuchmiichuk,
  and Nastasiia Osidach. 2023. Ua-gec: Grammatical          Instrumental case endings.
  error correction and fluency corpus for the ukrainian     У котрому рядку форми орудного вiдмiнка
  language. In Proceedings of the second Ukrainian
  natural language processing workshop (UNLP), pages
                                                            iменника утворено правильно? – а) пишаюсь
  96–102.                                                   iм’ям; б) пливе Черемошом; в) поснiдав ка-
                                                            шою; г) милувався вежою.
Fiona Anting Tan, Gerard Christopher Yeo, Kokil Jaidka,     English translation: In which row is the instrumen-
   Fanyou Wu, Weijie Xu, Vinija Jain, Aman Chadha,          tal case form of the noun formed correctly?
  Yang Liu, and See-Kiong Ng. 2024. Phantom:                Transliteration: U kotromu riadku formy orud-
   Persona-based prompting has an effect on theory-
   of-mind reasoning in large language models. arXiv        noho vidminka imennyka utvoreno pravylno? –
   preprint arXiv:2403.02246.                               a) pyshaius imiam; b) plyve Cheremoshom; v)
                                                            posnidav kashoiu; h) myluvavsia vezhoiu.
Yongjian Tang, Doruk Tuncel, Christian Koerner, and
  Thomas Runkler. 2025. The few-shot dilemma: Over-         Vocative case endings.
  prompting large language models. arXiv preprint           У котрому рядку усi форми звертання пра-
  arXiv:2509.13196.                                         вильнi? – а) Панi Оксано; дорога бабусю;
                                                            шановний колего; б) Вельмишановнi учасни-
Mariia Voloshchak. 2007.     Nepravylno–pravylno:           ки, пане ректору, Iлле Пилиповичу; в) Олеже
 dovidnyk z ukrainskoho slovovzhyvannia, 2 edition.
                                                            Андрiйовичу, Настю, Гале; г) любий друже,
 Prosvita and Ukrainska Vydavnycha Spilka, Kyiv.
                                                            товарише, Саво Петровиче.
Qile Wang, Prerana Khatiwada, Avinash Chouhan,              English translation: In which row are all vocative
  Ashrey Mahesh, Joy Mwaria, Duy Duc Tran, Ken-             forms correct?
  neth E Barner, and Matthew Louis Mauriello. 2026.         Transliteration: U kotromu riadku usi formy zver-
  " the explanation makes sense": An empirical study        tannia pravylni? – a) Pani Oksano; doroha babusiu;
  on llm performance in news classification and its
  influence on judgment in human-ai collaborative an-       shanovnyi koleho; b) Velmyshanovni uchasnyky,
  notation. arXiv preprint arXiv:2602.19690.                pane rektoru, Ille Pylypovychu; v) Olezhe Andri-
                                                            iovychu, Nastiu, Hale; h) liubyi druzhe, tovaryshe,
Hanna Yukhymenko, Anton Alexandrov, and Martin              Savo Petrovyche.
  Vechev. 2025. Mamaylm: An efficient state-of-the-art
  ukrainian llm. https://huggingface.co/blog/INSAIT-        Genitive plural endings.
  Institute/mamaylm.                                        У котрому рядку форми родового вiдмiнка
                                                            множини iменника утворено правильно? – а)
A    Representative Benchmark Items                         статтей; б) суддей; в) бур; г) узвишшiв.
                                                            English translation: In which row is the genitive
This appendix presents details on representative            plural form of the noun formed correctly?
benchmark questions in the original Ukrainian, to-          Transliteration: U kotromu riadku formy rodovoho
gether with transliteration and an English translation      vidminka mnozhyny imennyka utvoreno pravylno?
of each question stems.                                     – a) stattei; b) suddei; v) bur; h) uzvyshshiv.
                                                          129
Singular and plural forms of nouns.                     – a) pivtory litry; b) blyzko dvadtsiaty hryvniv; v)
У котрому рядку всi iменники мають фор-                 chotyry z polovynoiu dni; h) pivtora dni.
му однини i множини? – а) задум, манiпу-                Case forms of numerals.
ляцiя, свiдчення, доба; б) радiсть, задума,             У котрому варiантi подано правильнi вiд-
досвiд, чистота; в) досягнення, команда, аспi-          мiнковi форми числiвникiв? – а) трьохстам
рин, Марiя; г) вода, зима, азот, Херсон.                учасникам; б) ста мовами; в) восьмидесяти
English translation: In which row do all nouns have     рокiв; г) iз восьмистами студентами.
both singular and plural forms?                         English translation: In which option are the case
Transliteration: U kotromu riadku vsi imennyky          forms of the numerals correct?
maiut formu odnyny i mnozhyny? – a) zadum,              Transliteration: U kotromu varianti podano
manipuliatsiia, svidchennia, doba; b) radist, zad-      pravylni vidminkovi formy chyslivnykiv? – a)
uma, dosvid, chystota; v) dosiahnennia, komanda,        trokhstam uchasnykam; b) sta movamy; v) vosmy-
aspiryn, Mariia; h) voda, zyma, azot, Kherson.          desiaty rokiv; h) iz vosmystamy studentamy.
Gender forms of invariable foreign origin nouns         Use of numerals to indicate time.
and abbreviations.                                      У котрому рядку допущено помилку у вiд-
Граматичну норму дотримано в рядку: а)                  повiдi на питання «Котра година?» – а) сiм
великий НЛО, гарний Тбiлiсi; б) ВООЗ за-                хвилин на шосту; б) вiсiм годин; в) тридцять
боронила, молода iвасi; в) чистий Онтарiо,              хвилин по першiй; г) чверть на дванадцяту.
УПА боролася; г) сильний сироко, гарне кен-             English translation: In which row is there an error
гуру.                                                   in answering the question “What time is it?”
English translation: In which row is the grammati-      Transliteration: U kotromu riadku dopushcheno
cal norm observed?                                      pomylku u vidpovidi na pytannia “Kotra hodyna?”
Transliteration: Hramatychnu normu dotrymano v          – a) sim khvylyn na shostu; b) visim hodyn; v) try-
riadku: a) velykyi NLO, harnyi Tbilisi; b) VOOZ         dtsiat khvylyn po pershii; h) chvert na dvanadtsiatu.
zaboronyla, moloda ivasi; v) chystyi Ontario, UPA
borolasia; h) sylnyi syroko, harne kenhuru.             Pronouns. Normative use of pronouns.
                                                        Де займенник вжито правильно? – а) їх ро-
Adjectives. Comparative and superlative                 бота; б) їхня робота; в) чиєгось мiсця; г) на
forms.                                                  мойому мiсцi.
У котрому рядку подано правильнi форми                  English translation: In which option is the pronoun
вищого й найвищого ступеня порiвняння при-              used correctly?
кметникiв? – а) бiльш дешевший; б) довгу-               Transliteration: De zaimennyk vzhyto pravylno?
ватiший; в) довжелезний; г) якнайкращий.                – a) yikh robota; b) yikhnia robota; v) chyiehos
English translation: In which row are the compara-      mistsia; h) na moiomu mistsi.
tive and superlative forms of the adjectives correct?
Transliteration: U kotromu riadku podano pravylni       Verbs. Personal verb forms.
formy vyshchoho y naivyshchoho stupenia poriv-          У котрому рядку дiєслово має правильне
niannia prykmetnykiv? – a) bilsh deshevshyi;            особове закiнчення? – а) мелють каву; б)
b) dovhuvatishyi; v) dovzheleznyi; h) yak-              мелять каву; в) ревлять турбiни; г) купляють
naikrashchyi.                                           взуття.
                                                        English translation: In which row does the verb
Numerals. Combination of numerals with                  have the correct personal ending?
nouns.                                                  Transliteration: U kotromu riadku diieslovo maie
У котрому словосполученнi правильно узго-               pravylne osobove zakinchennia? – a) meliut kavu;
джено числiвник з iменником? – а) пiвтори               b) meliat kavu; v) revliat turbiny; h) kupliaiut
лiтри; б) близько двадцяти гривнiв; в) чоти-            vzuttia.
ри з половиною днi; г) пiвтора днi.                     Forms of the future tense.
English translation: In which phrase is the numeral     У котрому рядку подано правильнi форми
correctly combined with the noun?                       майбутнього часу дiєслова? – а) продаш менi
Transliteration: U kotromu slovospoluchenni             книжку; б) з’їсиш борщ; в) розповiси казку;
pravylno uzghodzheno chyslivnyk z imennykom?            г) буде читав казку.
                                                    130
English translation: In which row are the future-      na anhliiskii; v) navchaietsia muzyky; h) oplachuie
tense forms of the verb correct?                       za proizd.
Transliteration: U kotromu riadku podano pravylni
                                                       Complex cases of agreement in word combina-
formy maibutnoho chasu diieslova? – a) prodash
                                                       tions.
meni knyzhku; b) zisysh borshch; v) rozpovisy
                                                       У котрому рядку є приклади порушення
kazku; h) bude chytav kazku.
                                                       норм узгодження? – а) на станцiї Бахмут, на
Forms of the imperative mood.                          вулицi Хрещатику; б) у штатi Вiрджинiя, на
У котрому рядку подано правильнi форми                 вулицi Зеленiй; в) у мiстi Броди, нова стаття-
наказового способу дiєслова? – а) ходiмте              дослiдження; г) новий допис-оприлюднення,
з нами; б) давай зустрiнемось; в) розповiси            у Карпатах.
нам iсторiю; г) берiмось до роботи.                    English translation: In which row are there exam-
English translation: In which row are the impera-      ples of violations of agreement norms?
tive forms of the verb correct?                        Transliteration: U kotromu riadku ye pryklady
Transliteration: U kotromu riadku podano pravylni      porushennia norm uzghodzhennia? – a) na
formy nakazovoho sposobu diieslova?         – a)       stantsii Bakhmut, na vulytsi Khreshchatyku; b)
khodimte z namy; b) davai zustrinemos; v) rozpo-       u shtati Virdzhyniia, na vulytsi Zelenii; v) u misti
visy nam istoriiu; h) berimos do roboty.               Brody, nova stattia-doslidzhennia; h) novyi dopys-
                                                       opryliudnennia, u Karpatakh.
Standard verb forms: participles and gerunds.
Котре словосполучення вiдповiдає нормi?
                                                       Sentence-level syntax. Detached adverbial
– а) працююче населення; б) захоплюючий
                                                       modifiers expressed by participial phrases.
фiльм; в) тремтячий голос; г) керуючий бан-
                                                       Неправильно побудовано речення з дiєпри-
ком.
                                                       слiвником: а) Слухаючи доповiдь лектора,
English translation: Which phrase conforms to the
                                                       не забувайте робити нотатки; б) Створюючи
standard norm?
                                                       проєкт, вiн виявився дуже цiкавим; в) Про-
Transliteration: Kotre slovospoluchennia vid-
                                                       читавши лекцiю, професор вийшов; г) Ще
povidaie normi? – a) pratsiuiuche naselennia;
                                                       не навчаючись в унiверситетi, я вивчав гео-
b) zakhopliuiuchyi film; v) tremtiachyi holos; h)
                                                       графiчнi карти.
keruiuchyi bankom.
                                                       English translation: Which sentence with a verbal
A.2 Syntax                                             adverb is constructed incorrectly?
                                                       Transliteration: Nepravylno pobudovano rechen-
Word-level combinations. Prepositional gov-            nia z diiepryslivnykom: a) Slukhaiuchy dopovid
ernment.                                               lektora, ne zabuvaite robyty notatky; b) Stvo-
У котрому словосполученнi правильно вжи-               riuiuchy proiekt, vin vyiavyvsia duzhe tsikavym;
то прийменник при? – а) виявилось при до-              v) Prochytavshy lektsiiu, profesor vyishov; h)
слiдженнi; б) було при Б. Хмельницькому; в)            Shche ne navchaiuchys v universyteti, ya vyvchav
говорити при свiдках; г) при допомозi лiкiв.           heohrafichni karty.
English translation: In which phrase is the preposi-
                                                       Series of homogeneous sentence parts.
tion pry used correctly?
                                                       Порушено норми побудови рядiв однорiдних
Transliteration: U kotromu slovospoluchenni
                                                       членiв речення у рядку: а) Треба вивчати
pravylno vzhyto pryimennyk pry? – a) vyiavylos
                                                       iноземнi мови i спiлкуватися ними, щоб зна-
pry doslidzhenni; b) bulo pry B. Khmelnytskomu;
                                                       ти; б) Застосувати цю технологiю можна на
v) hovoryty pry svidkakh; h) pry dopomozi likiv.
                                                       рiзних майданчиках, сценах i локацiях мiста;
Nonprepositional government.                           в) Будь-якi пари – лекцiї чи семiнари – ва-
Котре словосполучення вiдповiдає нормi? –              жливi; г) Усi викладачi та студенти взяли
а) хворiє грипом; б) говорить на англiйськiй;          участь у конференцiї.
в) навчається музики; г) оплачує за проїзд.            English translation: In which row are the norms
English translation: Which phrase conforms to the      for constructing series of homogeneous sentence
standard norm?                                         parts violated?
Transliteration: Kotre slovospoluchennia vid-          Transliteration: Porusheno normy pobudovy ri-
povidaie normi? – a) khvoriie hrypom; b) hovoryt       adiv odnoridnykh chleniv rechennia u riadku: a)
                                                   131
Treba vyvchaty inozemni movy i spilkuvatysia          Transliteration: Kotre slovospoluchennia seman-
nymy, shchob znaty; b) Zastosuvaty tsiu tekhnolo-     tychno pravylne? – a) perevernuty storinku; b)
hiiu mozhna na riznykh maidanchykakh, stsenakh        perevernuty stilets; v) nosyty nazvu; h) prystupaty
i lokatsiiakh mista; v) Bud-yaki pary – lektsii chy   do roboty.
seminary – vazhlyvi; h) Usi vykladachi ta studenty
                                                      Distinguishing word meaning.
vzialy uchast u konferentsii.
                                                      Котре слово є синонiмом до безпiдставний? –
Agreement of the subject with the predicate.          а) безуспiшний; б) голослiвний; в) даремний;
Правильно узгоджено пiдмет iз присудком               г) неузгоджений.
у рядку: а) Бiльшiсть прийшли на модуль               English translation: Which word is a synonym of
з математики; б) Багато днiв минуло з того            bezpidstavnyi (“groundless / unfounded”)?
часу; в) Дехто з присутнiх не вивчили ма-             Transliteration: Kotre slovo ye synonimom do
терiалу; г) Багато викладачiв та студентiв            bezpidstavnyi? – a) bezuspishnyi; b) holoslivnyi;
взяло участь у конференцiї.                           v) daremnyi; h) neuzghodzhenyi.
English translation: In which row is the subject
                                                      A.4   Orthography
correctly agreed with the predicate?
Transliteration: Pravylno uzghodzheno pidmet iz       Counting violations of orthographic norms.
prysudkom u riadku: a) Bilshist pryishly na modul     Скiльки порушень мовних норм у реченнi:
z matematyky; b) Bahato dniv mynulo z toho chasu;     Українскi вченi докладають багато зусилль,
v) Dekhto z prysutnikh ne vyvchyly materialu; h)      щоб врятувати еко-систему. – а) 2; б) 3; в) 4;
Bahato vykladachiv ta studentiv vzialo uchast u       г) 5. Вiдповiдь: Б.
konferentsii.                                         English translation: How many violations of lan-
Norms for constructing complex sentences.             guage norms are there in the sentence: “Ukrainski
Яке речення збудоване без граматичних по-             vcheni dokladaiut bahato zusyll, shchob vriatuvaty
милок? – а) Ми не прийшли, так як не мали             eko-systemu.” Answer: B.
змоги; б) Сьогоднi представлять алгоритм              Transliteration: Skilky porushen movnykh norm
дiй, який створили географи, якi були на              u rechenni: Ukrainski vcheni dokladaiut bahato
конференцiї, яка була вчора; в) Андрiй по-            zusyll, shchob vriatuvaty eko-systemu. – a) 2; b) 3;
просив колегу переглянути свою доповiдь; г)           v) 4; h) 5. Vidpovid: B.
Котрий з двох студентiв, якi брали участь у
змаганнi, посiв призове мiсце?
English translation: Which sentence is constructed
without grammatical errors?
Transliteration: Yake rechennia zbudovane bez hra-
matychnykh pomylok? – a) My ne pryishly, tak yak
ne maly zmohy; b) Sohodni predstavliat alhorytm
dii, yakyi stvoryly heohrafy, yaki buly na konfer-
entsii, yaka bula vchora; v) Andrii poprosyv kolehu
perehlianuty svoiu dopovid; h) Kotryi z dvokh stu-
dentiv, yaki braly uchast u zmahanni, posiv pryzove
mistse?

A.3 Vocabulary

Word usage. Correctness of word combina-
tions by meaning.
Котре словосполучення семантично правиль-
не? – а) перевернути сторiнку; б) переверну-
ти стiлець; в) носити назву; г) приступати
до роботи.
English translation: Which phrase is semantically
correct?
                                                  132
B Few-Shot Examples English Translation

   1. Question: In the genitive singular, all nouns in the
      row take the ending -u (-iu).
      A) ensemble, folklore, Don, oak
      B) Buh, novel, Caucasus, sack
      V) Siberia, notebook, rain, orchestra
      H) snow, hurricane, pain, Monday
      D) anger, Amur, plot, regiment
      Correct answer: D

   2. Question: In the genitive singular, all nouns in the
      row take the ending -u (-iu).
      A) bus, hockey, silk, sorrow
      B) waltz, centner, people, percent
      V) sadness, institute, bridge, building
      H) football, university, rupture, apparatus (of the
      president)
      D) hectare, kilogram, wind, mushroom
      Correct answer: H

   3. Question: In the genitive singular, all nouns in the
      row take the ending -u (-iu).
      A) organism, breeze, raid, cement
      B) manner, ash tree, field, forest
      V) tractor, meter, color, London
      H) realism, slogan, rice, cosmos
      D) zero, chintz, liter, million
      Correct answer: A

   4. Question: In the genitive singular, all nouns in the
      row take the ending -a (-ia).
      A) station, atom, atlas, frost
      B) giraffe, September, perpendicular, cone
      V) patriarch, fallow land, theater, landscape
      H) erudite, Ostroh, region, oats
      D) mainland, microbe, bear, call
      Correct answer: B

   5. Question: In the genitive singular, all nouns in the
      row take the ending -a (-ia).
      A) medic, evening, computer, Berlin
      B) tiger, Monday, flag, voyage
      V) rectangle, textbook, kilogram, barometer
      H) waterfall, Danube, circus, intention
      D) egoist, ten-item set, cathode, gunpowder
      Correct answer: V

Figure 5: English version of the five few-shot examples
used in the prompt.




                                                             133
C    Few-Shot Examples Transliteration

    1. Question: U rodovomu vidminku odnyny zakinchen-
       nia -u (-iu) maiut usi imennyky v riadku
      A) ansambl, folklor, Don, dub
      B) Buh, roman, Kavkaz, mishok
      V) Sybir, zoshyt, doshch, orkestr
      H) snih, urahan, bil, ponedilok
      D) hniv, Amur, siuzhet, polk
      Correct answer: D

    2. Question: U rodovomu vidminku odnyny zakinchen-
       nia -u (-iu) maiut usi imennyky v riadku
      A) avtobus, khokei, shovk, zhal
      B) vals, tsentner, narod, vidsotok
      V) sum, instytut, mist, budynok
      H) futbol, universytet, rozryv, aparat (prezydenta)
      D) hektar, kilohram, viter, hryb
      Correct answer: H

    3. Question: U rodovomu vidminku odnyny zakinchen-
       nia -u (-iu) maiut usi imennyky v riadku
      A) orhanizm, lehit, reid, tsement
      B) sposib, yasen, pole, lis
      V) traktor, metr, kolir, London
      H) realizm, lozunh, rys, kosmos
      D) nul, sytets, litr, milion
      Correct answer: A

    4. Question: U rodovomu vidminku odnyny zakinchen-
       nia -a (-ia) maiut usi imennyky v riadku
      A) vokzal, atom, atlas, moroz
      B) zhyraf, veresen, perpendykuliar, konus
      V) patriarkh, perelih, teatr, kraievyd
      H) erudyt, Ostroh, krai, oves
      D) materyk, mikrob, vedmid, poklyk
      Correct answer: B

    5. Question: U rodovomu vidminku odnyny zakinchen-
       nia -a (-ia) maiut usi imennyky v riadku
      A) medyk, vechir, komp’iuter, Berlin
      B) tyhr, ponedilok, prapor, reis
      V) priamokutnyk, pidruchnyk, kilohram, barometr
      H) vodospad, Dunai, tsyrk, zadum
      D) ehoist, desiatok, katod, porokh
      Correct answer: V

Figure 6: Transliterated version of the five few-shot
examples used in the prompt.


D    Models Information




                                                            134
                            Model            Variant    Setting   Category
                            MamayLM          4B         IT        Ukrainian-focused
                            MamayLM          12B        IT        Ukrainian-focused
                            Lapa             12B        IT        Ukrainian-focused
                            Lapa             12B        PT        Ukrainian-focused
                            Gemma 3          1B         IT        Multilingual
                            Gemma 3          4B         IT        Multilingual
                            Gemma 3          12B        IT        Multilingual
                            Phi-4-Mini       3.8B       IT        Multilingual
                            Llama 3.1        8B         IT        Multilingual
                            Gemma 3          4B         PT        Base model
                            Gemma 3          12B        PT        Base model
                            Llama 3.1        8B         PT        Base model
                            Qwen3            8B         RSN       Reasoning model
                            GPT-OSS          120B       IT        Large models
                            Mistral-medium   2508       IT        Large models
                            Mistral-small    2506       IT        Large models
                            Llama 3.3        70B        IT        Large models

Table 3: Models evaluated in this work. IT denotes instruction-tuned, PT denotes pretrained, and RSN denotes
reasoning.




                                                       135
