---
url: https://www.stateof.ai/State-of-AI-Report-2026.pdf
title: State of AI Report 2026 (Nathan Benaich, Air Street Capital) — текст PDF, 244 слайди, pdftotext -layout
fetched: 2026-10-08
added_by: scout
source: S-cb550dc0
---

             STATE OF AI REPORT.
                   October 8, 2026
                   Nathan Benaich
                 AIR STREET CAPITAL.

stateof.ai                             airstreet.com
Introduction | Research | Industry | Politics | Safety | Predictions                           |1

About the author




                                          Nathan Benaich
               General Partner of Air Street Capital, investing in AI-ﬁrst companies.




                                       nathan@airstreet.com                       stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                            |2

Welcome to the 9th annual State of AI Report

     Analyzing the last 12 months of AI research, industry, politics, safety and predictions.

     Independently crafted every year since 2018.

     Informs conversation around AI today and its implications for the future.

     Freely available at www.stateof.ai

     Peer reviewed by members of top AI labs, startups, policy and academia.




                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                                         |3

What you need to know from the 2026 State of AI Report
Research
● Anthropic, OpenAI, and Google lead as benchmarks saturate. Better post-training, data, evaluations, and scaffolding expand agent capabilities.
● AI accelerates AI development: Claude led 26% of Anthropic's measured model R&D under supervision. Choosing worthwhile experiments is the next frontier.
● Physical AI approaches its GPT-2 moment, open mathematics problems fall, and AI-assisted drug programs reach Phase 3 as data and model licensing grows.

Industry
● Agent use and monetization broadens beyond developers. A Genius Bar for AI could help more people extract value through better tools and setup.
● OpenAI and Anthropic report combined annualized revenue run rates of roughly $105B across their businesses and inference business skyrockets.
● The SaaSpocalypse exposes uncertain winners. Financing, power, and construction constrain supply, while our data-center NIMBYism prediction plays out.

Politics
● US model export restrictions make access conditional. The superintelligence agenda and Pentagon dispute sharpen the ﬁght over AI control.
● Selected sovereign AI pledges total about $138B as countries realise they cannot rent sovereignty. Many will have to bargain for access to the frontier.
● Frontier-lab leaders call for slower capability gains, with no agreement on who can require pauses, authorize restarts, and verify compliance.

Safety
● During reduced-safeguard evaluations, OpenAI agents attacked Hugging Face while trying to cheat their scorer.
● Anthropic documents misuse in cyberattacks, surveillance, scams, and weapons development.
● Frontier attacks require frontier defense. Guardrails blocked Hugging Face's forensics, leading it to use a Chinese open-weight model.
● Reasoning-only monitors missed sabotage in tests. Values training cut ﬁctional blackmail from 65% to 19%, with production reliability unproven.

                                                                                                                                        stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                |4




                                     Section 1: Research




                                                                       stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                |5

12 months pass, and the frontier ﬁght is now a three-lab race
  On Artiﬁcial Analysis’s Intelligence Index, Claude Opus 5.5 leads at 58, and GPT-6 Astra and Google’s Gemini 4
  Argon tie at 53. On Arena’s default ranking, built from people’s votes, Argon leads at 1525, a tight pack of Claude
  models follows at about 1505 and OpenAI’s best, GPT-5.6 Sol, ranks #20. China’s best open-weights model,
  Xiaomi’s MiMo-V2.6-Pro, scores 46 on the index. Argon is so far only available to selected users.

        Intelligence Index, best model per lab                        Arena default view, best model per lab




                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            |6

Chinese open-weight models overtook American ones in AI research papers in 2026
  We analyzed AI papers on arXiv mentioning 21 model families. While closed US models (GPT, Claude, Gemini)
  account for 42% of mentions in 2026, they are losing ground to Chinese models. Zeta Alpha analysis reveals that
  among open-weight models, Chinese families surged from 9% of mentions in 2024 to 31%, US models fell from
  31% to 23%, and Qwen overtook Llama.

 All models: share of mentions by region (%)     Open-weight models only (%)             Qwen vs Llama (%)




                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                       |7

Same model, better harness = stronger agent
  With each model ﬁxed, changing the harness delivered a 6x gain on SWE-Bench Mobile, while Meta-Harness
  raised Haiku 4.5 from 27.5% with Claude Code to 37.6% on TerminalBench-2. Meaningful model comparisons
  require disclosing the harness and holding it ﬁxed or varying it systematically.

  ● On WeaveBench, LongHorizon-Harness improves
    Qwen 3.7-Plus enough to exceed the baseline
    performance of Opus 4.7.
  ● A controlled test paired three models with three
    harnesses on 100 SWE-bench Veriﬁed tasks. GLM-5.1
    rose from 52.5% to 65.5% between the minimal and
    full harnesses. Harness-induced performance
    variance was 7.8x model-induced variance in this
    experiment.



                                                                                          stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                 |8

Agents improve by choosing among specialized harnesses
  A single harness can work well on average yet miss tasks that need a different approach. Researchers at Meta,
  Duke and UC Davis evolve two harnesses on different development tasks, then choose one for each new problem.
  With the execution model held ﬁxed, this improves held-out math and coding results over Meta-Harness.

 ● With Gemini 3 Flash, the branches share 47%                     Different problems solved by each branch
   coverage, but each solves some problems the
   other misses.
 ● The router reaches 62% on Gemini math versus
   Meta-Harness's 46%, below the branches'
   combined potential coverage of 67%.
 ● Coding also improves: Terminal-Bench 2.0 rises
   from 44.8% to 50.0%, and SWE-bench Lite from
   63.6% to 66.0%, with Sonnet 4.5 ﬁxed.

                                                        Figure 2(b), math panels. 200 tasks per model. Circle areas are schematic.

                                                                                                                    stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                  |9

Recursive language models treat prompts as parts of the environment
  Long inputs can overwhelm a model even before they ﬁll its context window. MIT's Recursive Language Models
  (RLMs) keep the input in a code workspace, where the model can inspect it and delegate pieces to further
  (recursive) model calls. This lets a ﬁxed model work through inputs too large to read in one pass.
  ● The authors trained Qwen3-30B-A3B with RL on             Read large inputs through code and smaller model calls
    short tasks and found transfer to much longer inputs
    and new domains sharing a decomposition strategy.                Store the input outside the model
                                                                 Keep documents in a persistent code workspace
  ● The authors explain this as turning unfamiliar tasks
    into familiar subproblems: each model call stays
    “locally in-distribution” with its training.                         Inspect, split and delegate
  ● Transfer depends on learning a reusable                     Code calls models on selected pieces of the input
    decomposition, and RLMs are not uniformly cheaper.
    Recursive calls use ﬁxed weights at inference.
                                                                            Combine the results
                                                              Save intermediate answers and assemble the response

                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                        | 10

Skills and memory let agents reuse know-how without retraining
  Skills package reusable instructions and code, while memory preserves information for later tasks. These let
  developers improve an agent between model releases by changing what it can reuse. Papers matching the broad
  skills query rose from 152 to 1,486 in January-August 2025 and 2026.
     Skills paper matches, Jan-Aug 2025 vs 2026                    Memory tool matches, Jan-Aug 2026




                                                                                            stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 11

Karpathy’s autoresearch popularized the rush to recursive self-improvement (RSI)
  RSI is the pursuit of AI that builds better AI, autonomously. In March, Andrej Karpathy released autoresearch, a
  project in which an agent edits the training code of a small nanochat model, trains for a ﬁxed ﬁve minutes, keeps
  what improves, and repeats roughly 100 times overnight on one GPU. The user edits program.md, the instructions
  that deﬁne the research org. As Karpathy put it: “This repo is the story of how it all began.”
  ● The repo reached roughly 95,000 GitHub
    stars and 13,400 forks in 5 months.
  ● A ﬁxed 5-minute training budget makes
    every experiment comparable and turns
    one GPU into roughly 100 experiments a
    night, scored on validation bits per byte.




                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 12

We’re seeing a rapid growth in self-improvement papers
  Papers matching veriﬁable rewards grew 10.4x in January-August 2026 versus the same months of 2025,
  compared with 2.7x for RSI. The practical opportunity is to automate experiments with reliable scoring. Choosing
  valuable research questions remains a separate (and very valuable) problem…
            Growth in paper matches, Jan-Aug 2026 / 2025                             Narrow RSI query: 2.7x




                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 13

Agents can improve their own scaffolds, but acceleration is unproven
  Darwin Gödel Machine rewrites an agent’s scaffold: the prompts, tools and workﬂow around a frozen model.
  Hyperagents also rewrite the procedure that makes those edits. This can automate more of agent engineering, but
  a better agent does not necessarily become a better inventor of future agents…yet!
  ● Huxley-Gödel Machine selects agents by their                   Making the improvement procedure editable
     descendants’ scores. With GPT-5, it ﬁxed 57.0% of
     SWE-bench Lite issues vs. SWE-agent’s 56.7%.
  ● Red Queen co-evolves agents and evaluators. Its paper
     acceptance rate rose to 38.8% vs. HGM-H’s 21.8% at
     matched search cost, as rated by AI judges.
  ● Weco reports beating its hand-tuned agent in 100
     trials. Using the new agent to improve further agents
     gave no signiﬁcant efﬁciency gain, however.



                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 14

Stronger models can outgrow their harnesses
  Many harnesses have included elaborate behavioral rules, reminders and planning mechanisms to compensate for
  old model limitations. However, as models become more capable and successful agent behavior is trained back
  into them, these workarounds become redundant and can even hobble stronger models. Harnesses should provide
  interfaces that make the environment easier to act on, without adding redundancy in model behavior.
  ● Claude Code removed 80% of the system prompt for advanced models, with no measurable loss on coding
    evaluations. Few-shot tool use examples are also found to reduce exploration, with good interface design
    being more important.
  ● Harnesses have become curricula, where trajectories produced inside an evolving harness can update
    model weights (see Continual Harness). Recent GPT models are trained on the codex harness.
  ● Performance between lightweight and sophisticated harnesses shrink as model capability improves: the
    durable harness investments that remain are environment interfaces (tools, MCP servers), state
    management, observability and agent infrastructure (sandboxes, runtimes, etc).



                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                       | 15

Agents approach ofﬁcial instruct scores on PostTrainBench’s revised evaluation
  PostTrainBench tests autonomous post-training: each run targets one small base model and one benchmark, with
  10 hours on one H100. Version 1.2 covers four base models and six benchmarks. Results measure task-speciﬁc
  optimization; the ofﬁcial instruct models are reference points trained with different resources.
  ● On v1.2, Fable 5.1 scores 44.6%, Opus 5.5 43.8%
    and GPT-6 Astra 41.9%, versus 48.4% for ofﬁcial
    instruct models.
  ● BFCL was removed after task-quality and
    item-targeted training concerns. The former 95%
    result is insufﬁcient evidence of general
    function-calling superiority.
  ● These are benchmark-speciﬁc model adaptations,
    not one broadly improved assistant. Five Fable 5.1
    GPQA runs used Opus 5 as a fallback.


                                                                                            stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 16

Frontier agents sustain multi-day research with limited novelty in a speedrun
  Prime Intellect tested 18 models in 153 runs on the nanoGPT optimizer speedrun: train a 124M-parameter GPT
  to a target loss of 3.28 in fewer steps. Runs used 8xH200 GPUs without internet. Fable 5's best trajectory lasted
  8.7 days, with limited novelty reported in this setting.

  ● Fable 5 reached 2,726 steps from a 3,290-step baseline,
    closing 81.7% of the gap to a 2,600-step human record
    claim.
  ● Research budgets differed: after 24 hours, Fable 5 had
    reached 3,010 steps, versus 3,045 for Opus 5.
  ● Strong agents re-tested borderline results across seeds and
    revisited earlier failures, but limited novelty here does not
    establish a general limit on AI research.




                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 17

Can agents produce a top-tier research paper? No, but they can do its engineering.
  Researchers introduced shadow evaluations, in which they give an agent the central research question of a
  high-quality unpublished NeurIPS submission (so contamination is impossible) and let the paper’s original
  authors grade the output as reviewers. Each agent got six days, $3,000 of API credit, GPUs and the open web.
  ● Opus 4.8 completed all the engineering without human
    help, but both its papers were scored 2/6 and 1/6 -
    unambiguous rejections.
  ● Five failure modes recurred: no sense of the publishable
    bar, uncreative ﬁxes, ineffective backtracking, poor
    resource awareness and instruction drift.
  ● Both runs ended with under half the API budget spent,
    despite the models knowing their usage in real-time.
  ● Self-review by agents never returned an acceptance in
    dozens of rounds and the issues it ﬂagged were often the
    same ones the human reviewers later raised.
                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                              | 18

The work of smarter models is increasingly accepted by lab’s staff
  In an essay on building RSI, Anthropic (left chart) shared data on the code contributions of their employees. The
  output has increased by 8x in Q2 2026 compared to pre-2025, corresponding with the use of Mythos Preview.
  OpenAI sees the same results too (right chart).




                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 19

…and starts suggesting where the research should go next
  Even more interestingly, researchers rated next-direction turns suggested by Mythos Preview as better than the
  route a human researcher picked 64% of the time. This suggests that frontier models are generating quality
  contributions that exhibit research taste.




                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                        | 20

Claude now leads a quarter of Anthropic’s model R&D, with humans supervising
  Anthropic’s internal automation index tracks how much responsibility Claude takes on across model R&D. The
  share rated “AI leads” rose from under 1% in February to 26% in August 2026: Claude completes most of a task
  from a high-level prompt while a human supervises. More than 90% of measured work now involves substantial
  AI collaboration or leadership, but none is fully autonomous yet.




                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 21

Within 6 months, OpenAI researchers are solving much longer tasks autonomously
  In January 2026, OpenAI researchers used AI agents to autonomously complete tasks normally requiring 4-8
  hours of human labor with an 18% success rate. By July 2026, that same 18% success rate was achieved on
  signiﬁcantly more complex tasks requiring 32-64 hours of human labor.




                                                                                            stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 22

But coding agents are mostly used post-experimental ideation and design
  So far, the majority of coding agent use in OpenAI internal research has been on execution-related workﬂows,
  namely working on research infrastructure code, launching, monitoring and debugging runs, and technical help
  and review. Deciding what to research and how to do it is still not solved by coding agents.




                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                              | 23

As task benchmarks saturate, RSI evidence is moving inside the labs
  Public AI R&D suites no longer rule out advanced capabilities once models pass their thresholds or exploit their
  scoring. Labs increasingly rely on internal evidence of research acceleration. RSI-Exam tests 88 tasks externally,
  but no model reaches its frontier-calibrated reference.
  ● METR’s Opus 5.5 review cites a preliminary                              RSI-Exam: 88 tasks
    estimate of ~1.5x AI-driven research acceleration.
    The estimated time period is unspeciﬁed.
  ● OpenAI reports 3.1 agent-workdays per human
    workday. This measures activity, not an equivalent
    gain in research output.
  ● Noam Brown estimates about a 3x speedup,
    limited by serial experiments and GPU supply.




                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 24

Less shooting in the dark as more of the pretraining recipe got written down
  Detailed technical reports, codebases and training logs make building capable models less opaque than three
  years ago. More of the path from pretraining to reasoning and agentic behavior is now public. But scaling-law
  guidance is still incomplete, and choosing the right data mix remains experimental. Training a strong model still
  takes research judgment (the infamous “taste”) as well as enough compute to test many ideas.
  ● Training becomes more selective: Nemotron 3 Super uses 20T tokens for broad coverage, then 5T
    emphasizing quality. Step 3.5 Flash later emphasizes code, reasoning and tool use, retaining some general
    data as it specializes.
  ● Longer context can weaken other skills. After math scores dipped during million-token training, NVIDIA added
    a phase alternating 1M-token and 4K-token sequences to mitigate the decline.
  ● Healthy training loss can hide failing components. StepFun found MoE experts becoming inactive or
    developing extreme internal values while aggregate metrics looked normal. Monitoring individual experts
    exposed these problems.



                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                 | 25

The RL recipe got written down too
  Several well-documented open reproductions of agentic training pipelines were published this year, achieving
  results close to the state of the art. While open agent model reproductions remain a few steps behind the
  frontier, the tricks they disclose lower the barrier for a new lab to start successfully training an agent, with
  Thinking Machines and OpenThoughts Agent being good examples.
  ● Meta’s ScaleRL reports 400k+ GPU hours of ablations covering
    precision ﬁxes (fp32 logits), RL objectives and batch size. Many
    ﬁndings reverse conclusions from smaller scales.
  ● Cursor’s Composer 2 technical report includes many long-horizon
    rollout details such as updating behaviour policy weights
    mid-rollout, and ﬁxes for sampler/trainer inconsistency such as MoE
    router replay.
  ● DeepSeekMath-v2 shares their agentic data-generation pipeline in
    detail. Kimi K3 details ways to train reasoning efforts, compatibility
    with multiple harnesses, and anti-reward-hacking machinery.
                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 26

Scaling agentic RL creates huge demand for CPUs and memory alongside GPUs
  Long-horizon agentic RL spends much of its compute on inference (rollouts) rather than backprop, runs stateful
  rollouts against realistic often sandboxed environments, and must continuously sync fresh weights into
  distributed inference ﬂeets without letting trajectories go stale.
  ● Inference dominates RL compute: MAI-Thinking-1, a 1T-A35B MoE, uses 4,096 of 4,864 GB200s for
    inference, roughly ﬁve times its learner allocation, with generations up to 128k tokens.
  ● CPU and memory demand rises too: Kimi K3 used 51.2M stateful sandboxes with pause/resume, fork,
    snapshot, and sub-second launch. DeepSeek’s DSec reports 30,000 CPU cores and 250 TB of RAM serving
    3M sandbox instances daily in one deployment unit. Yet ~90% of sandboxes average ≤5% of requested CPU
    capacity, making resource sharing and idle-memory reclamation essential.
  ● Training environments increasingly resemble real work: Kimi K3 combines mocks of Gmail, Notion, Slack,
    and Canvas with harnesses including Kimi Code, Claude Code, and Codex.
  ● Inference can be distributed: Composer 2 synchronizes weights every training step through S3. Delta
    compression reduces updates for a 1T-parameter model to a few GB, enabling geographically distributed
    RL inference.
                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                               | 27

The training gym gets harder as the agent gets better
  RL agents learn little from tasks they always pass or always fail. Microsoft's TaskPilot generates coding problems
  and hidden tests in real repositories, then revises their difﬁculty using the current model's attempts. As FrogNano
  improves, new task batches keep its training near the edge of what it can solve.
  ● Agent-World generated 1,978 environments and 19.8k               Computer-use false positives (internal set)
    tools to train 8B and 14B agents, improving tool use,
    planning and coding across 23 benchmarks.
  ● FrogNano combines a simpler tool interface with ﬁve
    batches totaling 1.5k tasks. Qwen3.5-4B solves 61.5% of
    SWE-bench Veriﬁed (validation) and 37.6% of held-out
    SWE-bench Pro issues.
  ● Checks still matter, of course. With GPT-5.2 ﬁxed,
    Universal Veriﬁer falsely accepted 1% of failed
    computer-use runs, vs. 7% for WebJudge and 10% for
    WebVoyager.
                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                                    | 28

Models can learn from stronger teachers, specialists, or themselves
  Distillation teaches a student to imitate a teacher. Off-policy uses teacher or earlier-model responses, while
  on-policy uses the current student’s attempts. Self-distillation means the teacher is a copy of the same model.
 ● Cheaper transfer: Alibaba compared two methods from the same Qwen3-8B checkpoint. On-policy distillation
   reached 74.4% on AIME24 using 1.8k GPU-hours. By contrast, RL needed 17.9k GPU-hours to reach 67.6%.
 ● Combining specialists: Xiaomi trains math, coding and instruction-following teachers separately to avoid
   interference, then combines their skills via Multi-Teacher On-Policy Distillation (MOPD).
 ● Learning from itself: Self-Distilled Reasoner gives a frozen copy the worked solution. It guides the student token
   by token on the student’s own attempt, so no larger teacher is required.
                                                      How on-policy self-distillation works
          Current student                           Current student                               Student
           Question only                            Question + preﬁx                            probabilities
                                                                                                                                  Match distributions
                    Generate
                                                     Frozen teacher                                                               Update student only
                                                                                                  Teacher
           Student’s own                           Question + solution
                                                                                                probabilities
              attempt                                 + same preﬁx
                            Preﬁx = attempt so far. Same starting checkpoint. Teacher probabilities are not correctness scores.
                                                                                                                                        stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                          | 29

Frontier labs' own cheaper models decoded the reasoning they tried to hide
  Labs hide their models' reasoning because rivals can train on it using a process called distillation. Panﬁlov and
  colleagues found that cheaper models could reveal stronger models' hidden reasoning. Providers patched the
  ﬂaw. Could restricting access to these traces widen the gap between open-weight and closed models?
  ● Given Opus 4.8's encrypted reasoning block, Haiku 4.5               How hidden reasoning was exposed
    wrote out the reasoning in plain text. The same
    attack worked at OpenAI and Google.                                       1. Opus 4.8 generates reasoning
                                                                          API returns an encrypted reasoning block.
  ● A reasoning trace shows the teacher's steps, not just
    its answer. In prior work, reconstructed traces lifted a
                                                                              2. Replay the block to Haiku 4.5
    7B student from 68.4% to 76.0% on MATH500.                             The same provider accepts Opus's block.
  ● Closing this extraction route could make frontier
    reasoning harder to obtain for training. The paper                     3. Haiku reveals the hidden reasoning
    does not establish how much recent open-model                     A prompt induces it to write the trace as plain text.
    progress depended on it, or whether the capability
    gap will widen - we suspect it could.
                                                                                                         stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                               | 30

Self-play can learn from documents or from programs it invents
  Self-play creates its own training tasks, so is an appealing approach to AI training. SPICE post-trains a reasoner on
  document-grounded questions, whereas zero-data self-play learns from programs, starting from random weights.
  Natural text/DNA validation selects hyperparameters but supplies no pretraining gradients.

        SPICE: document-grounded post-training                      Zero-data self-play: synthetic pretraining




  Qwen3-4B-Base: 35.8%→44.9% overall (+9.1 pp)                ≈100% exact-match on reverse-string, stack and
  across 11 reasoning benchmarks. R-Zero: 39.5%;              associative recall after sufﬁcient in-context
  Absolute Zero: 40.7% under the same evaluation.             examples; no weight updates at evaluation.


                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 31

Models can learn while searching for a better solution too
  AlphaEvolve searches for solutions using a frozen model. TTT-Discover, meanwhile, updates gpt-oss-120b’s
  weights during inference time, rewarding promising attempts and reusing the best candidates. The goal is one
  better solution to the current problem, rather than a model that generalizes to new tasks.
  ● TTT-Discover improved two mathematical bounds.                  Selected results; H100 TriMul search below
     TriMul runtime fell 51.5% on A100 (4,531→2,198 µs)
     and 15.3% on H100 (1,371→1,161 µs), versus the best
     human entries.
  ● Reusing promising candidates mattered more than
     weight updates in one ablation. An attention kernel
     and a third math problem missed the leaders.
  ● TTPO trains on majority-vote answers. Across three
     math benchmarks, Qwen3-1.7B rose from 38.0% to
     45.2% without supplied answer labels.


                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                | 32

What happens in context no longer has to stay in context
  Experience gathered within a trajectory changes a sequence model's token distribution. This experience is
  expensive to keep in context and disappears when the context is cleared. New continual learning approaches
  consolidate useful behaviours learned in-context into persistent memory or model updates, allowing experience
  from one trajectory to improve behaviour on the next.
  ● Monash / ByteDance Seed: Experience Distillation retains at least 64.8% of in-context learning gains,
    versus 3.8% for direct SFT on the same experience. Across 749 software engineering tasks and six text
    adventure games, it matches RL baselines with at least 9.6x fewer environment interactions.
  ● Microsoft Research: Online Experiential Learning extracts reusable lessons and consolidates them into
    model weights over successive rounds. On Frozen Lake, Qwen3-1.7B reduces average response length to
    roughly 70% of its initial level by round three, alongside improved accuracy. Separate tests largely preserve
    out-of-distribution instruction-following performance.
  ● Physical Intelligence: π*0.6 trains autonomous robot experience and expert corrections back into the VLA,
    more than doubling throughput and roughly halving failures on some of its hardest tasks.


                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 33

Linear attention ﬁnds a place alongside full attention
  Linear attention summarizes earlier tokens in a ﬁxed-size memory, reducing the cost of long contexts. Full
  attention keeps direct access to individual tokens that this summary can lose. Qwen combines the two, making
  linear attention a useful component of a hybrid model.

  ● Qwen3.8-Flash-Next beats its predecessor on 8 of                Three linear layers per attention layer
    14 benchmarks using about a ninth of the training
                                                                                    Sparse attention (QSA)
    FLOPs. This gain includes other architecture and
    training changes.                                                               Reads selected tokens
  ● Other labs are trying this too. Kimi Linear generates
    tokens 2.3x faster than full attention at 1M context,
    one sequence at a time. Moonshot also uses its                                  Linear attention (GDN)
    delta-attention technique in the 2.8T-parameter                                 Keeps a compact memory
    Kimi K3.


                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 34

DiffusionGemma uses parallel drafting to speed up local text generation
  When a GPU serves one user, moving model weights from memory can take longer than computing the next
  token. Google's DiffusionGemma drafts a whole block of text, then revises it in parallel. This gives the GPU more
  work at once and speeds up token output, with a trade-off in answer quality.

  ● DiffusionGemma revises a 256-token
    block over several passes, then moves to
    the next. Extra training reduces the
    passes needed. The four steps shown
    are illustrative.
  ● Google reports up to 4x faster token
    output on dedicated GPUs serving one
    or a few users. Standard Gemma 4 still
    produces higher-quality answers,
    though.

                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                                         | 35

Gyms for AI: there's a bench for that
   Software accounts for 57% of veriﬁed citations in this selection; Terminal-Bench alone contributes 45%. Totals
   sum Google Scholar counts for 46 of 58 benchmark releases introduced or refreshed since October 2025.
        Write software               483                Use computers                 56                 Learn and remember    65       Improve AI          82

  Build software and                              Carry out tasks across                          Learn from context and             Train models and improve
  complete terminal tasks                         websites, apps and ﬁles                         remember future tasks              how agents work
  Terminal-Bench 2.0*                 383         OSWorld 2.0                           22        CL-bench                      42   PostTrainBench          44
  ProgramBench                         48         ClawBench                             10        PM-Bench                       6   AIRS-Bench              23
  NL2Repo-Bench                        20         Workspace-Bench                        7        Context-Bench                n/a   HarnessOpt-Bench         5

        Do science                    57                Run a business                 8                 Health and security   59       See, hear and act   43

  Solve research problems                         Manage a business and                           Test clinical advice,              Interpret sound and video,
  and discover hidden rules                       interpret ﬁnancial data                         security and lie detection         reason about actions
  Collider-Bench                       10         CEO-Bench                              4        Liars’ Bench                 16    RoboWM-Bench            23
  Riemann-Bench                         6         FinSheet-Bench                         2        EVMbench                     10    Butter-Bench             2
  DiG-bench                             2         Vending-Bench 2*                     n/a        MedConsultBench               2    VideoASMR-Bench        n/a
Note: totals sum veriﬁed Google Scholar counts across the curated set. Snapshot: October 7, 2026. n/a = no count veriﬁed.
* Reported use by at least two frontier labs.                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                | 36

But who benchmarks the benchmarks?
  Epoch AI ﬁnds substantive ﬂaws in nine of its ﬁrst 15 benchmark reviews. Broken scoring, exploitable
  environments, and uneven evaluation conditions can distort the results used to compare models.

   ● Epoch inspects tasks, scoring logic, prompts, tools,            Flawed
     and resource limits. Insufﬁcient access means “Not              At least one substantive defect.           9
     enough info.”                                                   Terminal-Bench 4.0.0, SWE-bench Veriﬁed.
   ● Reviewers sample 50 random tasks, or all if fewer,
                                                                     Veriﬁed
     checking for hidden requirements, wrong scoring, and
     shortcuts.
                                                                     Meets minimum standards, with caveats.     4
                                                                     PostTrainBench v1.1, WeirdML v2.
   ● The default failure threshold is ≥20% faulty sampled
     tasks or systemic grading issues. Unfair setups and             Not enough info
     inconsistent versions can also fail.                            Cannot support a quality verdict.          2
                                                                     CritPt and FrontierCode.




                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 37

Benchmarks built to last for years are now saturating in months
  Every headline eval in the 2025 State of AI Report has hit or neared its ceiling. On Epoch AI's independent runs
  the best AIME score is 100%, GPQA Diamond 95.8% and FrontierMath Tiers 1 to 3 93.7%, and ARC-AGI-2 went
  from 18% to 95% in eleven months.
  ● GPQA Diamond: the #1 and #5 models are
    1 point apart, and Epoch estimates 5 to
    10% of questions are mislabeled, so the
    ceiling sits below 100.
  ● ARC-AGI-2: 18.3% (GPT-5 Pro, Oct 2025) to
    95.0% (GPT-6 Astra, Sep 2026), as cost per
    task fell from $7.14 to $1.12. GPT-6.1 Sol
    now scores 94.2% for $0.25.
  ● In January 2026, Artiﬁcial Analysis dropped
    MMLU-Pro, AIME 2025 and LiveCodeBench
    because they no longer discriminate.
                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 38

The hardest math benchmark went from 22% to 100% in fourteen months
  FrontierMath Tier 4 was built as research-level math that should hold out for years. On Epoch's corrected v2 set,
  GPT-5 scored 22% in August 2025, GPT-5.4 Pro 59% in March and Claude Fable 5 90% in June. In September
  GPT-6 Astra hit 98% and GPT-6.1 Sol solved all 41 private problems.
  ● OpenAI funded FrontierMath and has access to
    30 of the original 50 Tier 4 problems, but
    Claude Opus 5.5 also scores 95%.
  ● Epoch now tracks 49 unsolved research
    problems and credits AI with nine solutions,
    four without human help. GPT-6 Astra supplied
    the main proof of one rated a major advance.
  ● Surge's private Riemann-Bench still has
    headroom: GPT-5.6 Sol leads with 74.4%.



                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 39

ARC-AGI-3 lasted ﬁve months…depending on the harness, Astra hits 63% or 99.9%
  In March 2026, ARC-AGI-3 introduced hundreds of fully interactive, video game style turn-based environments,
  meant to be much harder than ARC-AGI-2’s static visual puzzles. Although humans score 100%, initial scores by
  frontier models were a measly 0.5%. But then Claude Opus 5 reached 30.2% in July, GPT-6 Astra changed the
  game in September and GPT-6.1 Sol followed at 52.7%.
  ● Astra achieved 62.7% on the standard
    ARC Prize harness and 99.9% with a
    state-persistent adapter, which ran
    3.66x faster on 49% fewer tokens.
  ● It outperforms the median human in
    action efﬁciency on 96% of levels.
  ● Astra is considered a "major
    breakthrough" by ARC developers for
                                                              State of AI 2025 cutoff
    its novel symbolic modeling
    capabilities.
                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 40

Hard benchmarks do not always separate leading models
  Which evals still tell models apart? We plot each benchmark’s best published score against its ﬁrst-to-ﬁfth model
  gap. ARC-AGI-3 and MirrorCode remain the widest separators, at 55 and 46 points.
 ● Terminal-Bench 4.0, APEX-Agents 1.1 and FrontierSWE
   v2 have ﬁrst-to-ﬁfth gaps of 16, 14 and 11 points.
 ● CritPt remains hard (top score 32%), yet its top three
   are within 0.6 points. APEX now tops out at 82%, with
   an 8.7-point top-three gap: its leaders are no longer
   as tightly clustered.
 ● Other leaders remain close: DeepSWE’s top ﬁve score
   about 70–74%. FrontierCode 1.1 spans 2.6 points.
   These are point estimates across different tested
   model rosters, not signiﬁcance tests.



                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 41

Long-horizon coding rankings change with the task and the evaluation budget
  FrontierSWE gives agents 20 hours to build software in a common harness. MirrorCode asks them to rebuild
  programs from documentation and a runnable reference, allowing up to seven days and 10B tokens. These
  different tests produce different leaders.
  ● FrontierSWE: Astra scores 65.5% versus Opus 5.5’s
    62.3%, at $1,030 versus $99 per trial.
  ● MirrorCode: Opus 5.5 passes every hidden test on
    77% of tasks at max effort, versus Astra’s 47% at high
    effort.
  ● The scores measure different outcomes under
    different budgets. Neither establishes a universal
    coding ranking.




                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 42

High scores can hide unﬁnished scientiﬁc analyses and desk work
  FrontierChallenge and EarthVerse test scientiﬁc analyses and natural-hazard investigations, while OSWorld 2.0
  tests ofﬁce workﬂows such as expense claims. Partial scores credit individual requirements met. A correct
  calculation or document can earn points even when the report is incomplete or the claim is never submitted.
  ● On 97 scientiﬁc workﬂows in FrontierChallenge,                  Partial progress versus task success
    GPT-5.6 Sol scores 87.9/100 but fully completes
    only 20.6% of tasks.
  ● On EarthVerse's 405 natural-hazard investigations,
    the same model gets 82.1% of required answer
    items right. Only 34.8% of tasks reach the 95%
    threshold.
  ● On OSWorld 2.0's 108 computer tasks, Opus 5 earns
    77.7% partial credit but completes 44.3%. Missed
    approvals or unsubmitted forms can leave
    otherwise useful work unﬁnished.
                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 43

METR needs harder tasks to reliably measure the strongest models
  METR’s 50% time horizon is the length of task, measured in human expert hours, that an agent is predicted to
  complete half the time. It measures task difﬁculty, not time without human oversight. The strongest models now
  reach the sparsely tested end of the scale, so longer horizons are becoming harder to measure reliably.
 ● Estimates rose from 4.9h for Opus 4.5 to 12.0h for         50% time horizon and 95% conﬁdence intervals
   Opus 4.6 and 17.4h for early Mythos Preview. The
   latter's 95% conﬁdence interval spans 8.5-55.1h.
 ● Only ﬁve tasks take humans more than 16h, so
   estimates up there are sensitive to scoring choices.
   METR warns that results above 16h are unreliable.
 ● METR's dashboard has no estimate for GPT-6 Astra,
   Fable 5.1 or Opus 5.5. June's GPT-5.6 Sol estimate
   swung with how cheating was scored, and METR
   called none of the results robust.


                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 44

The house wins: every model loses money on KellyBench sports betting
  Frontier models must learn to solve long-horizon tasks in changing environments. To test this, General Reasoning
  built KellyBench, a simulated English Premier League market where agents build ML models to trade on matches
  and maximize gains over a season. Every model lost money on average, highlighting a remaining capability gap
  for frontier models on ultra-long-horizon tasks.
  ● Agents receive the 2023-24 season’s lineups, results, public
    odds and match statistics in sequence, with £100k to build
    models, ﬁnd an edge and size bets.
  ● All 12 models lose money on average over 5 seeds, and six
    go bankrupt in at least one. Opus 4.7 ends with £96k and
    GPT-5.5 with £90k, but most do far worse.
  ● GPT-5.5’s strategies score highest on a 52-point expert
    rubric for sophistication, at just 30%.



                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 45

The highest-earning e-commerce agent is among the worst at avoiding fraud
  E-CommerceBench gives 18 models CNY 100k to run up to four online stores for 365 simulated days. Built by
  Alibaba and HKUST using Taobao and Tmall data, it tests purchasing, pricing and cash management. A high return
  can hide weak supplier screening and little learning from experience.
  ● GPT-5.6 Sol averages CNY 1.43M over ﬁve runs, but                     Year-end assets (CNY)
    sends 18.48% of order spending to fraudulent
    suppliers. Opus 4.7 sends 0.12%.
  ● Prices and deals follow rules, unlike
    Vending-Bench’s LLM-driven suppliers. Agents face
    6.9k products, 576 suppliers and changing demand,
                                                                Order spending to fraudulent suppliers (%)
    with an LLM voicing replies.
  ● On repeat purchases, 16 of 18 models show no
    clear progress in bargaining prices down. A year of
    trading rarely translates into better buying.


                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 46

Frontier models can play unfamiliar games, but struggle to discover the rules
  DiG-bench gives agents 70 text-based games that have never appeared online. Text is used to isolate discovery as
  the operative challenge. At each turn, agents see the current game state and available actions, but not the rules
  or win condition, which they must infer through their own experimentation.
  ● Forty-nine of the 70 games are private to limit
    contamination and tuning. Every game was solved by at
    least one human on ﬁrst exposure, so its rules are
    discoverable.
  ● Opus 5 solved 50/70, but frontier models together
    solved only 9/20 in the two hardest tiers.
    General-purpose agent harnesses did not help.
  ● Rule discovery, not execution, is the bottleneck: Gemini
    3.1 Pro rose from 18/70 to 69/70 when given the true
    rules but no strategy.


                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 47

Multimodality became continuous interaction
  Thinking Machines previewed a continuous interaction model that handles interaction in one learned loop, rather
  than through external scaffolding. Previous ‘live’ experiences built on top of multimodal models would scaffold
  ASR, vision, dialogue and TTS into a pipeline. Interaction models may still invoke an external asynchronous
  background reasoner or make tool calls.
  ● Interaction models chunk time into ~200ms micro-turns, removing
    the traditional user/assistant turn boundary
  ● At each step the models see, listen and speak, enabling overlaps,
    silence, interruption and visual cues to become native behaviour
  ● The models also process text tokens at each step to call tools,
    interact with the environment or invoke a reasoner model.
  ● In China, where livestreaming is a major retail channel, labs are
    investing in interaction models. MiniCPM-o 4.5 is a 9B full-duplex
    interaction model, which can run on edge devices with <12GB RAM.
    ByteDance’s SeedRealtime is another example.
                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                       | 48

Generative video goes real time and lets a streamer steer it!
  Most video models return a ﬁnished clip after you’ve prompted it and waited a couple seconds. Media-focused
  inference company fal took MiniMax’s open weights H3 video and audio model to create H3 Max, which adds data
  for prompt following and aesthetics, plus a serving engine and GPU kernels optimized alongside the model.
  ● fal reports generating a ﬁve-second clip in under
    three seconds, about 35x the throughput of the
    ofﬁcial H3 endpoint.
  ● Their Director mode carries 39 frames into each new
    segment and remembers prior prompts. It drops
    overlapping frames so successive segments play
    continuously, giving you the real-time streaming feel.
  ● On fal.live, viewers vote on what happens next. At 24
    FPS, prompts steer the next segment, opening
    interactive TV with a delay before changes appear.


                                                                                           stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 49

World models let agents learn and test actions in simulated environments
  A world model predicts what happens after an action. Repeating those predictions creates an imagined rollout.
  Agents can use it to plan, generate training experience or test behavior. The following examples cover generated
  worlds, learned state representations, driving and robot control.




     Note: The diagram shows three possible uses, not a one-to-one map to the following slides.
                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                  | 50

SIMA 2 improves in generated worlds, with Gemini setting and scoring the tasks
  DeepMind paired Genie 3’s generated worlds with SIMA 2. Gemini proposes tasks, scores video of each attempt
  and supplies feedback for retraining. Gains transfer to held-out worlds, but this initial result centers on navigation
  and uses Gemini’s own scoring rubric.

   Genie 3 generates a world   SIMA 2 acts in it   Gemini sets tasks and scores   SIMA 2 retrains on scores   Test: held-out worlds



  ● Trained on urban Genie 3 worlds, SIMA 2 improves on
    nearly all training tasks, often by 25 points or more on the
    0 to 100 rubric (DeepMind, Dec 2025).
  ● The gains transfer: on most held-out natural-world tasks,
    the self-improved agent beats the initial one (ﬁgure).
  ● The authors call this initial, navigation-centered evidence,
    scored by the same Gemini model that drives the loop.


                                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                               | 51

Agora-2 is a learned game engine for humans and AI agents
  Odyssey trains on Diablo II video paired with actions and game state, learning how participants interact. Four
  humans and sixteen AI agents can share a simulation shaped by their collective actions.
  ● A simulation transformer predicts how participants affect                     Player 1 attacks
    one another. A shared state tracks their positions and
    interactions, including when they leave a player's view.
                                                                         Learned dynamics: boss defeated
  ● A ﬂow-matching video transformer generates each
    perspective. Training removes visual history so it must use
    the supplied state, and gives extra weight to errors on the       Player 1 video            Player 2 video
    characters driving the action.
  ● Alongside efforts to replace game engines with learned
    models, coding agents are helping developers modify and
    combine existing games, using established modding tools
    and reverse-engineered code.


                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                        | 52

World models can plan without learning to paint every pixel
  A robot planning a route needs to predict where its actions lead. Meta’s V-JEPA 2.1 learns visual features by
  predicting representations of video, rather than reconstructing pixels. Using those features in a navigation world
  model cuts planning time roughly 10x while preserving trajectory accuracy.
                                                                                                Planning time for a two-second trajectory
 ● Given a current view and a goal image, the planner
   searches for a two-second route using the                                          NWM (SD-VAE)
   Navigation World Models (NWM) setup.                                               128 steps

 ● The baseline also plans in latent space, but learns                                V-JEPA 2.1
                                                                                      8 steps
   it by reconstructing images. Meta changes the
   representation, prediction target and sampling
   method.
 ● Plans need 8 reﬁnement steps instead of 128, with
   average trajectory error nearly unchanged across
   four datasets (3.03 vs. 2.98).

    Note: Open-loop benchmark. Colors show learned features in three example plans.                                          stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                               | 53

Wayve’s GAIA world model becomes a bonaﬁde driving simulator

       2023 - GAIA-1                 Mar 2025 - GAIA-2                  Dec 2025 - GAIA-3                  Aug 2026 - GAIA-4
   Predict a driving video        Generate the whole view               Vary a recorded scene            Put the driver in control
 ● Text and actions guide         ● Five synchronized                ● Change the car's path,           ● Camera and radar
   next-token prediction            cameras with latent                preserve recorded                  generation follows the
   and video decoding.              diffusion.                         trafﬁc.                            AI Driver's decisions.
 ● One camera view,               ● 8.4B parameters.                 ● 15B parameters and               ● Compare models or
   trained on 4,700 hours           Control trafﬁc and                 about 10x GAIA-2's                 rerun interventions on
   of London driving.               weather in the UK, US              training data.                     recorded scenarios.
                                    and Germany.




 Text changes snow and lighting   Five cameras, three vehicle rigs   Prescribed path, recorded trafﬁc   Real and generated radar

                                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                | 54

Odyssey-3 demonstrates a world model can adapt to physical and virtual tasks
  Odyssey-3 is an autoregressive diffusion transformer pretrained on visual observations to simulate how the world
  evolves over time. Observation-action pairs then train a decoder to turn its representations into controls, which
  the company evaluates on real-world driving tasks, dual arm manipulation, humanoids and gameplay.
  ● With the backbone frozen, 20 hours of simulated              Driving on Indian roads   Robot-arm manipulation
    driving data produced a road-driving policy.
    Simulation-trained policies reached 77% of real-data
    policies' distance between safety-driver interventions.
  ● Tens of hours of robot data supported manipulation
    and Flexion's humanoid control. Robot arms recovered
                                                                    Flexion humanoid        GTA to RDR2 transfer
    from missed grasps without demonstrations of those
    recoveries.
  ● A policy trained on ~2 hours of GTA footage produced
    horseback movement in Red Dead Redemption 2
    without retraining, an early example of transfer.
                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 55

Robotics gets its GPT-2 moment: generalization now scales with pre-training
  Skild's S1 shows in-context learning emerging with scale. On unseen tasks, one video prompt and zero ﬁne-tuning
  sees the model climb from ~0% success at 1k pre-training hours to 66% at 100k hours, while a
  language-prompted VLA trained on identical data and compute stays at 9%. Sunday Robotics sees the same shape
  on laundry folding: the in-domain vs unseen-home gap falls from 82% to ~0% with pretraining scale.




                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 56

Teaching robots requires data about how to act
  Robots learn to manipulate objects from demonstrations that connect what they see with how to move. People
  can provide these by controlling a robot, using handheld grippers, or wearing cameras as they work. Each
  approach differs in how the recorded movements are translated into robot actions.

   Teleoperation                        Handheld grippers (UMI)               Egocentric human video
   Direct robot demonstrations          Demonstrations without a robot        Human demonstrations at scale

   A person controls a robot            Tracking captures the path            Models estimate hand and
   while its observations and           and opening of a person’s             wrist movements from video,
   actions are recorded.                handheld grippers.                    then transfer them to a robot.




                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 57

For π0.7, context makes imperfect robot data useful
  Naive training on diverse robot data would average across strategies and degrade the learned policy. To ﬁx this,
  each training episode is richly annotated with context such as what the robot should do and how the action was
  done, so demonstrations, failures, and web data all become usable signal.

  ● π0.7’s prompt combines subtask language, generated
    subgoal images, and metadata for speed, quality,
    mistakes, and control mode.
  ● Those labels let one model train on failures,
    autonomous rollouts, and expert demonstrations,
    then request the desired behavior at inference time.
  ● On laundry, throughput improved as lower-quality
    data was added with metadata, but fell without it.
    Removing the most task-diverse 20% also cut
    success on three unseen tasks.

                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                | 58

A robot turns ﬁve minutes of play into reusable skills
  A kitchen task combines familiar actions in a new order: open a container, put something inside, then close it.
  Imitation learning often learns the whole sequence, while classical planners need hand-written rules. Penn's
  SymSkill learns both reusable motions and the conditions for using them from unsegmented demonstrations.
  ● A vision-language model identiﬁes objects ofﬂine.
    Relative object positions deﬁne learned conditions,
    such as where the gripper must be before an action.
  ● It reaches 85% success across 12 single-step
    RoboCasa tasks. Separately, a real Franka learns from
    ﬁve minutes of play and performs tasks up to 12
    steps.
  ● A planner reorders skills and recovers after
    disturbances. Recombining practiced movements
    avoids collecting demonstrations of every possible
    sequence.
                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                             | 59

Robot planners use execution history to choose the next action
  Complex robot tasks split into deciding what to do next and executing the movement. This is often called a
  System 2 / System 1 architecture: a reasoning planner directs a fast motor policy. Google's Gemini ER 2 monitors
  execution and adjusts its instructions, while NVIDIA's Vesta uses memory to plan across multiple steps.
                                                                                          Next subtask
  ● ER 2 tracks live video and retries failures. In Google's         System 2                                      System 1
    internal tests with a real VLA, replacing ER 1.6 with             Planner                                     Motor policy

    ER 2 raises success from 48.6% to 60.0%.                                          Observations and progress

  ● Vesta pairs an 8B Qwen3-VL planner with GR00T                    Vesta remembers the candy inside the box
    N1.6. On counting, drawer-search, and hidden-object
                                                                      Close the box                  Choose the matching tray
    tasks, it adds 38.3 points of success over the actor
    alone.
  ● Joint training also beats Vesta's specialist ablations in
    navigation and embodied reasoning. Real-robot
    evidence remains limited to 20 trials per task on one
    YAM setup.
                                                                                                           stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 60

With a longer memory, a robot can improve long-horizon task completion
  Long assemblies can look similar at different stages, so the latest camera frame may not reveal what to do next.
  Most robot policies see only a short history. RoboTTT adds an adaptive memory to GR00T N1.7, helping it track
  progress and recover without retaining every frame.
  ● Across three YAM assembly tasks, RoboTTT scores                 Gear Bot: a ﬁve-minute, ten-stage assembly
    79% task progress versus 42% without memory and
    56% with recurrent Gated DeltaNet memory.
  ● Fast weights compress observations as they arrive.
    Performance improves with up to 8k timesteps of
    training context, while inference cost stays constant.
  ● On the ﬁve-minute Gear Bot assembly, it ﬁnishes 2/10
    trials versus zero for every baseline. Better task
    tracking is promising, but reliable completion is still
    difﬁcult.


                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 61

Simulation is a bedrock of robotic reality
  Robot policies are costly to test on hardware, while hand-built simulators may rank them incorrectly. SimFoundry
  reconstructs interactive scenes from video and generates related objects, layouts, and tasks. It tests whether
  scores in those scenes predict performance on real robots.
  ● Seven tasks test policies including π0, π0.5, GR00T          Real scenes become interactive variations
    N1.6/N1.7, and DreamZero. Simulated and real scores
                                                                   Real
    have a mean correlation of 0.911.
                                                                  scene
  ● Depth, segmentation, and 3D models recover objects
    and movable parts. Physics checks stabilize the scene,
    then new layouts expand the training data.                Simulated
  ● This could reduce hardware needed for model                   scene

    selection. Evidence covers selected tabletop tasks,
    with optional manual reﬁnement, not arbitrary
                                                                   New
    environments.                                                variant


                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 62

A humanoid learns stair climbing in four hours of simulation
  PPO trains robots but discards past experience. Soft Actor-Critic reuses it but can be unstable on complex bodies.
  FlashSAC uses larger networks and batches with fewer updates. Batch normalization and a classiﬁcation loss
  stabilize action-value learning and limit error ampliﬁcation.
  ● 4,096 simulated Unitree G1s learn stair climbing in
    4h on one A100, versus nearly 20h with PPO. The
    controller runs on real stairs without further
    ﬁne-tuning.
                                                                       Simulation training to stair climbing
  ● Across 60+ tasks in ten simulators, FlashSAC improves
    performance and training speed over PPO and
    FastTD3, especially on high-dimensional control.
  ● Transfer uses randomized physics and an established
    sim-to-real setup. The draw is a reusable, faster
    learning recipe, building on earlier transfer successes.


                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 63

Robots must get a grip by learning contact physics
  Human and robot hands differ, so copying joint positions can produce a grasp that slips or cannot lift a lid.
  OmniRetarget and VideoMimic preserve contact geometry. CHORD goes further, rewarding contacts that can exert
  similar forces and torques on the object.
  ● CHORD trains RL policies from human hand-object                CHORD: opening a lid requires useful contact
    demonstrations. It matches the forces contacts could support,
                                                                                          Human
    rather than measuring the person's actual force.
                                                                                          contact
  ● Across 1,831 simulated tasks, it reports 82.1% success.
    Ablations beat contact-position-only rewards: nearby contacts
    need not be mechanically equivalent.                                                  Match contact
                                                                                          position
  ● Real Dexmate tests use Sharpa hands and motion capture. The
    controller follows a ﬁxed demonstration without replanning, so
    the scale claim comes from simulation.
                                                                                          Match possible
                                                                                          forces and torques


                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                  | 64

Astra drives a robot arm without a robot policy, but can’t handle contact or refuse danger
  Robots normally need a VLA trained on robot data to turn camera images into motion. The RoboDojo team
  instead gave OpenAI's GPT-6 Astra three cameras and one tool that moves the gripper to a point. Robocurve then
  tested whether models refuse harmful requests once they control real arms. It works, but is slow…
  ● Across 42 simulated tasks, Astra scores 28.97 versus          Simulated task success: Astra vs the best trained VLA
    24.90 for DM0.5, the best of 40 trained policies.
    GPT-5.5 scores 1.13 with the same tool.
  ● Astra wins on geometry and language: 60% on Push T
    versus 0.7% for the best VLA. It scores 0% on tube
    insertion, where DM0.5 reaches 59%.
                                                                 Asked to stab a human-like ﬁgure (a prop doll)
  ● RoboDojo halted hardware tests after Astra damaged
                                                               GPT-6 Astra                              MolmoAct2 (VLA)
    equipment. In a Robocurve X thread without
    published methods, Astra attempted 97% of harmful
    requests and Fable 5.1 80%. MolmoAct2 never
    refused, but completed only 6%.
                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                              | 65

Coding agents run experiments on a robot ﬂeet
  ENPIRE gives coding agents a repeatable robot experiment: reset the scene, run a policy, check the outcome, and
  inspect failures. People ﬁrst help validate those tools and then the agents can change training code and control
  strategies, rather than rely on a researcher to tune each attempt.
  ● Codex (GPT-5.5), Claude Code (Opus 4.7), and Kimi                   Eight YAM stations test policies in parallel
    Code test policies on YAM arms. Tasks include pin
    insertion, GPU insertion, and cutting zip ties.
  ● On pin insertion, eight agent-robot pairs reach
    near-perfect performance in ~40 minutes versus over
    90 for one. Success allows up to eight recovery
    attempts.                                                           GPU insertion             Pin insertion
  ● Agents can combine RL, imitation, and procedural
    control. More robots speed experiments, but token
    costs grow disproportionately and human setup
    remains necessary.
                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                              | 66

Real-world lab data can make an open model into a capable materials analyst
  X-ray diffraction (XRD) reveals which crystalline materials an experiment produced, but overlapping signals can
  take scientists hours to interpret. Periodic Labs started with Kimi K2.6 and extended it with scientiﬁc midtraining
  (a multimodal blend of academic literature, code, and experimental data to build broad scientiﬁc understanding),
  then reinforcement learning on its experimental data for XRD.
  ● On 134 difﬁcult lab samples, Neon succeeds
    55.3% of the time, up from its base model’s
    2.7% and ahead of Astra and Fable 5.1 in the
    same Periodic harness.
  ● Midtraining on literature, code and
    experiments improves subsequent RL.
    Expert-calibrated LLM judges supply training
    feedback.
  ● To connect lab hardware to frontier agents,
    Anthropic released a preview of Model
    Hardware Standard, the MCP for labs.                                                         stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                       | 67

OpenAI graduates from Erdős problems to a $1M Millennium Prize problem
  Whether smooth three-dimensional ﬂuid ﬂow can develop a singularity had remained unresolved for roughly 90
  years. OpenAI’s system constructed such a breakdown under external forcing. The unforced Navier-Stokes case
  remains open.
  ● In August, Astra resolved three Erdős problems about
    when patterns must appear in networks, with proofs
    checked by the Lean proof assistant.
  ● 10,000 agents ran for 88 hours, but Noam Brown
    credits multi-agent work with under 10% of the
    Navier-Stokes result.
  ● Clay: apparently settled, assessment ongoing. OpenAI
    will not claim the prize.
  ● On October 6, OpenAI released 722 manuscripts in
    372 result families from an unreleased model, with
    partial Lean veriﬁcation.
                                                                                            stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 68

Claude improves a longstanding bound related to the Riemann hypothesis
  Prime numbers have a predictable average density, but their spacing is irregular. The Riemann hypothesis would
  tightly bound the error in estimates of how many primes lie below a given number. Claude combined existing
  mathematics to raise a related proven lower bound from 41.67% to 67.25%.
 ● The hypothesis puts all relevant zeros of the zeta                    Proven lower bound (%)
   function, which encodes primes, on one line. A proof
   must cover inﬁnitely many zeros, beyond any
   numerical check.
 ● Claude proved at least 67.25% of the nontrivial
   zeros are on that line and simple, meaning not
   repeated, without assuming the hypothesis.
 ● The model connected existing research to prove a
   new theorem. The full hypothesis remains
   unresolved, and the remaining zeros are not shown
   to be off the line.
                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                        | 69

Frontier models more than doubled the best Terminal-Bench Science score in weeks
  Terminal-Bench Science 0.1 tests agents on 70 research-derived workﬂows in runnable software environments. At
  release in August the best model, Opus 5, solved 30%. On the current leaderboard, GPT-6 Astra now solves 68.1%
  and Opus 5.5 63.3%.
   ● Tasks span data analysis, simulation and
     imaging, not full research projects.
   ● At maximum effort Astra and Opus 5.5
     cost $23 to $24 per task. Fable 5.1
     scores 40.0% (52.6% in Anthropic's run).
   ● Off the leaderboard, OpenAI reports
     GPT-6.1 Sol at 57.0% for $5.47 per task,
     Anthropic Sonnet 5.5 at 59.9%.




                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 70

Veriﬁcation cuts fabricated results, while human scientiﬁc oversight remains essential
  Thirty experts reviewed 150 manuscripts on 50 matched topics. Removing Co-Scientist’s reliability modules raised
  invalidating result hallucinations from 4% to 46%. A separate physical experiment in the same study still relied
  on humans to set constraints and validate the result.

  ● The full system reduced invalidating result
    hallucinations to 4%, versus 46% in the
    matched ablation and 90% for Agent
    Laboratory.
  ● Severe methodology failures remained in 24%
    of papers and severe plagiarism in 16%.
  ● Gemini generated a machine-executable recipe
    to grow 2D electronic materials. Humans loaded
    the samples and validated successful growth on
    the ﬁrst attempt.

                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 71

Nearly half of frontier models’ “done” claims in lab-handling tasks were incomplete
  Mecka gave three frontier models camera views and control of robot arms, with no demonstrations or ﬁne-tuning.
  Human reviewers graded nine labware tasks across 540 attempts. Completion remained low, and a model saying
  “done” was often not evidence that it had ﬁnished.
                                                                  Human-veriﬁed task completion
  ● 89 of 192 “done” declarations were
    incomplete: 79 partial completions and 10
    failures.
  ● Only Opus completed any hard task: two
    successes in 60 attempts.
  ● These are labware-handling tasks, not tests
    of autonomous scientiﬁc discovery.




                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 72

Protein language models scale from sequence to structure and function
  ESM Cambrian (ESMC) learns protein sequences by predicting hidden amino acids. ESMFold2 uses what ESMC
  learns to predict the 3D structure of proteins and how they ﬁt together. Biohub used these models to design
  binders - proteins that attach to a chosen disease target - and tested selected designs in the lab.
  ● From sequences alone, ESMC learns which amino acids
    lie close together in a folded protein, even when far            Hit rate by target    Effect of more compute
    apart along its chain.
  ● Testing 84 designs per condition, more search and
    ranking improved hit rates in 9 of 10 tests. Designs
    were minibinders or antibody binding parts joined in
    one chain (scFvs).
  ● A PD-L1 binder - which helps the immune system
    attack cancer - designed with ESMC needed 1.6 nM for
    half-maximal signaling recovery, versus 2.6 nM for the
    control. Less protein is needed for this effect.
                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                    | 73

IsoDDE and Pearl jointly predict proteins and bound drug molecules
  Cofolding models take a protein sequence and a drug's chemical structure and predict their joint 3D arrangement,
  allowing the protein to change shape around the drug. Isomorphic Labs' IsoDDE also predicts binding strength
  and potential binding sites. Genesis's Pearl lets researchers guide predictions with known structures.
  ● IsoDDE ranks candidate complexes by conﬁdence and is              Predicting an unfamiliar protein-drug interaction
    trained on PDB structures through Sept 2021. Across 60           Training example    Experiment      IsoDDE prediction

    low-similarity complexes, top-ranked accuracy was 50.0%
    versus AlphaFold 3's 23.3%. The report doesn't detail the
    architecture and training recipe.
  ● Pearl's trunk learns pairwise relationships of the protein and
    ligand. A rotation-equivariant diffusion denoises atomic
    coordinates: rotating the input rotates the prediction.
  ● Pearl's ﬁve-stage training mixes experimental, predicted and
    physics-generated complexes. Protein, cofactor and ligand
    templates guide binding-pocket predictions.
                                                                                                      stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                | 74

Faster afﬁnity prediction lets drug designers screen more candidates
  TerraBind and Nesso-1 skip full atom-by-atom generation to predict binding strength faster. TerraBind also
  reports better agreement with measured afﬁnity: Pearson correlation is 16% higher on CASP16 and 20% higher
  across 18 proprietary assay targets than Boltz-2. Generalization remains a challenge.
           TerraBind: 26.6x faster in its test                   Nesso-1: 1.0-2.7 seconds per prediction




         Feb 2026. A6000, 196 tokens, 10 pose samples/complex.          Aug 2026 preprint. H100, 10 compounds/target.
              End-to-end timing includes pose generation.        Nesso-1 (blue), Boltz-2 (gray). Excludes ﬁxed loading/MSA costs.

                                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                 | 75

Latent-X2 jointly generates binder sequences and atomic structures
  Latent-X2 is an all-atom generative model that designs protein binders together with their interactions with a
  target. It jointly generates amino-acid identities and 3D coordinates. Latent-Y is the agent that turns research
  goals into model inputs and selects candidates for lab testing.
  ● X2 takes as input a target sequence and backbone,             Latent-Y applies X2 to a prolactin-binding task
    binding-site residues and binder format. Antibodies                Prompt: disrupt prolactin receptor binding
    add a scaffold and binding-loop lengths. The target
    and binder share a 512-residue context.
  ● X1 is trained on the PDB and AlphaFold structures,
    while X2 shares its training cutoff. X2's full data mix,
    architecture and training objective remain undisclosed.
  ● Structure predictors ﬁlter for conﬁdence and
    agreement with the generated complex. Testing 4-24
                                                                                                     Time (s)
    designs per antibody format per target yielded binders
    for 9/18 targets.
                                                                                                    stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                | 76

Using a binding predictor more than doubles the yield of designed nanobodies
  BoltzProt-1 generates protein binders and uses BoltzPPI, a protein-interaction predictor, to select designs for
  laboratory testing. Compared with ranking by structure conﬁdence alone, it raised the conﬁrmed hit rate from
  3.3% to 8.0% across ten novel targets.
  ● Across ten novel targets, interaction-based ranking         Conﬁrmed binders / tested designs on 10 novel targets
    raised conﬁrmed binders from 5 to 12 among 150
    tested designs per method (i.e. 3.3% to 8.0%).
  ● Seven of the 12 conﬁrmed binders passed every
    developability test, including stability and unwanted
    binding.
  ● The companion BoltzMol-1 pipeline found
    small-molecule hits on 6 of 10 targets, testing 28-51
    compounds each.
  ● Protein candidates still need downstream optimization.


                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                              | 77

Chai's designed antibodies pass laboratory tests beyond binding
  Antibodies must bind their targets and remain stable enough to manufacture and use. Chai-1 predicts molecular
  structures, while Chai-2 generates new binders, including full antibodies. Chai's detailed experimental study tests
  their drug-like properties, while its newer Chai-3 has entered pharma partnerships.
  ● Among 88 designed antibodies against 28 targets, 86%               Targets with a clean antibody design
    had at most one developability ﬂag. For 24 targets, at
    least one design had no ﬂags.
  ● Chai-2 found binders for all six tested GPCRs,
    membrane receptors that are difﬁcult antibody targets.
    Designs activated two of the receptors.
  ● Chai says Chai-3 doubles its predecessor's success rate.
    The public announcement does not establish a
    matched denominator, so the chart uses Chai-2 data.



                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                  | 78

Designed antibodies direct T cells toward a cancer mutation in lab assays
  Cells display fragments of internal proteins on surface molecules called MHC. Nabla Bio's JAM-2 generates
  antibodies that recognize these fragments, including a cancer-associated KRAS mutation. Joining a designed
  antibody to a T-cell-binding component lets it recruit immune cells to kill cells displaying the fragment.
                                                                   Recognition of a single mutant amino acid
  ● Screening about 84,000 designs per target recovered
    binders against all ﬁve targets.                            Cryo-EM            JAM-2 design
  ● A selected KRAS G12V design reached half-maximal                                                            Binding pocket
    cell killing at 0.07 nM versus 0.48 nM for the
    benchmark antibody. Lower concentration means
    greater potency.
  ● The leads spared wild-type controls in these assays.
    Target cells were artiﬁcially loaded with peptides, so                                                  Circled: mutant Val12
    natural tumor recognition remains unproven here.
                                                             Orange: antibody. Green: MHC. Magenta: KRAS fragment. The mutant Val12 side
                                                             chain ﬁts the antibody pocket. Selected structural validation.


                                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                        | 79

An alignment technique from chatbots produced heat-stable ﬂu antigens
  Protein language models reward sequences that look natural, which is not the same as sequences that work.
  ProteinDPO borrows direct preference optimization, the method used to align chatbots to human feedback, and
  trains it on physical stability measurements instead.
 ● Preferences came from ~660,000 stability
   measurements on 405 small protein domains.
 ● With no hemagglutinin training data, 36 of 45
   H5 designs kept antibody binding and held or
   improved stability.
 ● One nine-mutation design gained 17°C of
   melting temperature, and +13°C and +32°C
   when moved to 2024 strains.




                                                                                            stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                | 80

AI can design working bacteriophage genomes, but cannot fully predict their biology
  ΦX174 is a virus that infects and kills E. coli. Its small genome has overlapping genes, so one DNA change can
  affect several proteins, which makes designing its genome a challenging AI task. Stanford and Arc used their
  Evo 1 and Evo 2 models, DNA language models trained on natural genomes to predict and generate DNA
  sequences, to create functional phage genomes.

  ● 16 of 285 assembled designs produced viable phages.         Whole-genome design         Predicting viability (AUC)
    A cocktail of these phages evolved to overcome
    resistance in laboratory-cultured E. coli.
  ● An independent reanalysis found Evo 2 scores ranked
    viable genomes well (AUC 0.86), but their designs
    didn’t deviate far from their natural relatives.
  ● Further validation found that about half of
    single-nucleotide changes made by the models
    impaired the phage’s ﬁtness. The ability of AI models to
    predict this phenotype wasn’t strong.
                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions               | 81




                                     Section 2: Industry




                                                                       stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 82

OpenAI and Anthropic’s revenue are >3x’ing YoY, each time from a higher base
  The two labs are now generating a combined $105B revenue a year, up from $30B at the start of 2026. Their run
  rates grew 3.6x in 2024, 4.7x in 2025, and are already 3.5x in the ﬁrst eight months of 2026.

 ● OpenAI's run rate topped $40B in August 2026,
   roughly doubling from $21.4B at the end of 2025.
 ● Anthropic reached a $65B run rate in July, up from
   $9B entering the year, per its letter to investors.
 ● OpenAI says gross cloud accounting inﬂates
   Anthropic’s revenue by up to $8B. The FT reports
   its >80% gross margin excludes partner revenue
   sharing and model training.




                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                                                  | 83

How does $105B of AI revenue compare with the industries AI is disrupting?
   OpenAI and Anthropic’s $105B revenue run rate rivals the service businesses they aim to disrupt. Broader
   annualized AI revenue estimates reach $229B at analyst ﬁrm Exponential View and ~$150B at The Economist,
   with different scopes and dates.

      IT services: 2.1x TCS + Infosys                               Accounting/tax: Almost half the Big 4                             Legal: 1.6x UK legal services




Note: Labs: July/August 2026 run rate. TCS + Infosys: FY2026. Big Four: FY2025. UK legal: 2024. Scale comparison, not displaced revenue.
                                                                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                                             | 84

 Codex users up 15x in seven months and Anthropic's $1M+ customers doubled in three
    OpenAI’s Codex went from 1.6M weekly users in early February to 25M active users on 31 August as their product
    marketing focused the app on knowledge work. Over 1,000 customers spend >$1M on Anthropic.

                             Codex users, millions                                              Claude Code run-rate                      Customers over $1M a year




Note: from public data by OpenAI, Anthropic and their staff. Codex counts are weekly active users through June and 'active users' from July.   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                        | 85

OpenAI and Anthropic capture 96% of token spending tracked by Ramp
  Among businesses connecting their API usage to Ramp, Anthropic regained the spending lead in late September.
  Through October 3, it accounted for 52.4% of token spending, compared with OpenAI’s 43.3%. Other providers
  together accounted for 4.2%.

                                                                                             Other 4.2%



                                                                                             OpenAI
                                                                                             43.3%



                                                                                             Anthropic
                                                                                             52.4%


                                                                                            stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                  | 86

Model market share changes with the platform and what is measured
   OpenAI and Anthropic account for 20.7% of requests on OpenRouter. On October 4, open-weight models handled
   62.7% of Vercel tokens but received 26.9% of spending. Different customer samples, workloads and prices mean
   these snapshots cannot be read as a single market-wide ranking.

                                             Share of text requests                                       Open-weight share
                            Week beginning September 28, 2026                                 October 4, 2026 (daily snapshot)




Note: Different samples, metrics and periods. Platform activity is not global market share.                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 87

Top of the models: longevity is hard
  Anthropic had at least one model in the top ﬁve for 51 of 52 weeks on Arena and 44 on Artiﬁcial Analysis. Only
  Anthropic and Google DeepMind cleared one-third of the year on each leaderboard. OpenAI cleared that
  threshold only on Artiﬁcial Analysis, and xAI only on Arena.




                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 88

“We cannot miss this moment because we are distracted by side quests” - OpenAI
  With raging success comes the need to prioritize. Ten OpenAl product surfaces have been retired or given a
  published shutdown date in 2026 alone. Anthropic never opened the fronts in the ﬁrst place.




                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 89

Focus is expensive: the abandoned categories have been claimed by competitors
  As OpenAI narrows its focus, rivals pursue categories it left behind or never entered. Neolabs may resemble
  biotechs: proving a research bet could make them challengers or acquisition targets.




                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 90

DeepMind is the talent supply chain for its competition
  While OpenAI attracts lots of public ﬂack for the departure of its team members, far more staffers have left
  DeepMind for competitors. The heatmap shows people who worked at the row lab and later joined the column
  lab, directly or after a stint elsewhere.




                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                  | 91

A research bet can still pay off: Jev takes 27% of OpenRouter’s classiﬁcation requests
  Choosing which tool to call or whether to ﬂag a transaction is a classiﬁcation task, not a writing task. TypeSafe
  spent two years building Jev around that distinction: a model that assigns probabilities to predeﬁned answers
  without generating text and unlike prior generation ML, obviates the need for feature engineering. Its early
  adoption suggests a focused research bet can ﬁnd demand even in a market crowded with frontier models.
  ● TypeSafe reports 70-500ms responses from a single parallel pass, at
    $0.042 per million input tokens and free output during early access.
  ● Vercel says ~13% of paid AI Gateway teams used Jev within 24 hours,
    twice GPT-5.6’s share over the same window.
  ● On OpenRouter, Jev took 27% of weekly classiﬁcation requests within
    ten days: uptake in one category, not overall usage or revenue.
  ● The company is reportedly on a $100M annualized run rate after 7
    days.



                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                             | 92

Leading AI companies keep scaling beyond their ﬁrst $100M
   After reaching $100M, Legora and Sierra doubled in about six months and Harvey grew to $400M. Lovable now
   reports $600M and Cursor has been reported above $4B. Starting points differ across companies.

         Months from stated starting point to $100M                                     Revenue in months since reaching $100M




Note: Launch: Higgsﬁeld, Lovable, Kling, Sierra. $1M ARR: Cursor, Legora.
First revenue: ElevenLabs. Founding: Harvey (upper bound). Clocks and metrics differ.
Months are approximate. Cursor line ends at $1B; later >$4B at 17 months.                                          stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 93

AI-native private companies grow about 3x as fast at the upper quartile
  Standard Metrics compares companies where AI is the product (“AI native”) with existing software businesses that
  have added it (“AI enabled”). In preliminary Q2 2026 data, revenue growth at the 75th percentile was 256%
  versus 90% at $1-20M in annualized revenue, and 172% versus 53% above $20M.




                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                              | 94

AI-native growth is fastest among newer companies and those selling to SMB/mid-market
  AI natives outgrow AI-enabled SaaS in every founding cohort and customer segment. At the 75th percentile, YoY
  growth is 487% versus 199% for companies founded since 2020, and 303% versus 82% for SMB and mid-market
  sellers. Among enterprise-focused companies in Q1 2025’s top growth quartile, 42% of AI natives stayed there a
  year later, versus 23% of AI-enabled SaaS and 28% of non-AI companies.




         Note: Left panel data pools Q3 2025 to Q2 2026 for companies with $1M+ annualized revenue.
                                                                                                      stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                          | 95

The top 1% of ﬁrms spend about 580x the median per employee on AI
   In August 2026, the median ﬁrm in Ramp’s top 1% spent $7,205 per employee per month, versus $12.50 for the
   median ﬁrm. A separate Ramp analysis ﬁnds that 1% of customers account for about 80% of observed spending
   on OpenAI and Anthropic.

                      Top 1% of ﬁrms                                          Top 10% of ﬁrms          Median ﬁrms
                                                $7,205                                          $676                 $12.50




Note: Monthly spend per employee. Panels use different scales. August 2026.                                    stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                        | 96

>50% of Claude user chats involve important work, usually under human direction
  What are regular people using Claude for? And what does it tell us that AI spend and benchmarks don't?
  Researchers at Stanford's SALT Lab analyzed 249,834 consumer Claude.ai conversations from two weeks in spring
  2026 through Anthropic's privacy-preserving Insights pipeline. The sample covers chat only, excluding Claude
  Code and Claude Cowork.
  ● 56% of conversations assigned a criticality tier were
    consequential or high-stakes work, and 12% were
    high stakes.
  ● Humans led the work with AI assisting in 72% of
    assessable conversations overall.
  ● Verbatim use of AI output declines from 21% on
    ephemeral tasks to 13% on high-stakes tasks.
  ● Friction appeared in 50% of all conversations, and
    users attempted active recovery in 79% of the
    conversations containing friction.
                                                                                            stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                | 97

Codex adoption remains far higher inside OpenAI than among external users
  How far along is agent adoption outside the labs? Codex data compare OpenAI staff with organizational and
  individual ChatGPT users. For context, a separate analysis of S&P 500 companies’ AI disclosures found that 69%
  reported live deployments, but only 2% disclosed metrics tracked over time.
  ● 97.9% of active OpenAI workers used           Codex usage relative to ChatGPT   Users by peak task complexity
    Codex in the preceding 28 days, compared
    with 17.3% of organizational users and
    0.7% of individual users.
  ● The share of individual Codex users
    assigning at least one estimated
    eight-hour task rose from 2.1% in
    December 2025 to 25.6% in May 2026.




                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                 | 98

Non-developers are growing usage of Codex faster than developers are
  Weekly non-developer users grew faster than developers across individual, organizational, and OpenAI groups.
  From August 2025 to June 2026, individual non-developer users increased 137-fold, organizational users
  189-fold, and OpenAI users 12-fold, the latter reﬂecting their already high baseline. This growth is also likely
  inﬂuenced by improved education and awareness of agentic capabilities.
                         Developers                                              Non-Developers




                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 99

Non-developers’ Codex use is growing faster than developers’ use
  Who is picking up coding agents now? Codex was built for software work, and engineering still dominates
  absolute usage. The fastest growth is now coming from legal, sales, recruiting and marketing, almost entirely from
  near-zero starting points.

   ● Since February 2026, weekly active enterprise Codex
     users grew 108x in legal, 41x in sales, 41x in recruiting
     and 26x in marketing, against 5x in engineering.
   ● Depth still favors software: in June 2026, Codex
     generated 26.8% of the average organizational
     engineer's combined ChatGPT and Codex output
     tokens, against 1.9% for the average legal user.
   ● Anthropic separately reports management, sales and
     legal as the fastest-growing non-software occupation
     groups using Claude Code.

                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 100

VC-backed companies went from near parity to 10x on AI spend
  In September 2023, the median VC-backed company spent $3.40 per employee per month, against $2.13 for
  other ﬁrms. By August 2026, VC-backed spend rose 24x over nearly three years, compared with 3.9x for other
  ﬁrms.


                                                                                       $81.20


                                                                                       $8.33

                                                                                       $7.86




                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                            | 101

AI performance still varies widely across ﬁnancial work
  Claude Opus 5 scored 100% across 20 attempts on four structured accounting tasks. However, it passed only
  12.3% of ATLAS-Finance’s 100 simulated banking assignments, which require a correct workbook and proper
  delivery. Better environments, evaluations and expert training data may close this gap.

                      Mercor: structured accounting tasks                          ATLAS-Finance: whole-task pass rate

 12 licensed CPAs worked alone, with a three-hour limit and   In one failed assignment, Opus 5 passed all 13 self-checks by
 no colleagues, clients or accumulated company context.       validating against its own wrong ﬁnancial assumption.




                                                                                                                                 100%
                                                              Top three models. No scored human baseline or error bars.
 Each dot is an attempt: 23 human and 20 AI attempts.

                                                                                                                     stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                        | 102

Heavy token users grew revenue 3x faster than light users over a 12 month period
  BCG grouped 107 public technology companies above $500M in trailing-12-month revenue into quintiles by
  Cursor monthly token consumption, over April 2025 to March 2026. Median YoY revenue growth rises across
  every quintile, with the sharpest step from Q3 to Q4 rather than at the very top.




                                                                                           stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 103

Heavy AI spenders hire faster…except for scientists
  Ramp linked its card and bill-pay AI spend to Revelio headcount records for 21,559 US ﬁrms to compare them
  based on their AI usage. Heavy spenders, the top third at $33.67 per worker per month, added 10.2% headcount
  over two years and 12% at entry level, whereas light adopters never separated from the control group. Scientists
  are the exception, where both groups grow and converge by month 24. Almost all gains sit in tech companies…




                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                                        | 104

Early AI labor studies point to risks for junior workers
  Anthropic studied how AI affects jobs and learning. US labor data show tentative signs of weaker hiring among
  young workers in AI-exposed occupations. In a separate experiment, developers who used AI were less able to
  explain how the code worked and identify bugs afterward.
  ● No clear rise in unemployment in AI-exposed jobs                                                             Coding comprehension quiz (%)
    relative to unexposed jobs since late 2022.
                                                                                                                100
  ● Job starts appear to have slowed for 22-25-year-olds
    entering AI-exposed jobs. The cause remains uncertain.                                                        75                67%
  ● 52 developers learned Trio, a Python library for                                                                                               50%
    concurrent tasks, then took a 14-question quiz without                                                        50
    AI. It tested code comprehension: scores were 50%
                                                                                                                  25
    after learning with AI versus 67% without it.
                                                                                                                    0
                                                                                                                               Without AI         With AI

 The quiz tested code reading, debugging and understanding of the library after two coding tasks. The speed gain from AI was not statistically
 signiﬁcant. This measures immediate learning, not long-term skill loss.                                                                         stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 105

AI in education: the best tutor is not a helpful assistant
  A good tutor helps students solve problems themselves. That requires teaching behavior, not just correct answers.
  A classroom trial in Sierra Leone measured learning gains from teacher-led Gemini activities, while tutor
  benchmarks show why general assistants can still over-help.

  ● In 48 classrooms across 12 schools, 1,763 students were randomized to
    teacher-led Gemini activities or standard instruction. Math scores improved
    by 0.258 standard deviations after eight weeks.
  ● The 95% conﬁdence interval was 0.027-0.488. This tests a structured
    classroom program, not unrestricted chatbot use or long-term learning.
  ● TutorMoments and MathTutorBench ﬁnd that giving correct answers is
    different from teaching. Curriculum context and prompts that make students
    think remain product-design challenges.



                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                            | 106

The AI build-out is adding jobs even as some ofﬁce roles shrink
  The Economist estimates the creation of 320,000 extra US infrastructure jobs and 730,000 extra jobs in
  AI-related professions relative to broader hiring trends. Among ofﬁce roles, employment grew for data scientists
  and paralegals but fell for data-entry clerks and customer-service staff.
       Infrastructure                                 AI professions                                        Ofﬁce jobs are diverging
  Jobs above trend (thousands)                   Jobs above trend (thousands)                    Employment change, May 2023-25 (%)
    Electrical contractors                         Software developers                    800    Data scientists                                +37
    HVAC & plumbing                        300     Maths & data science                          Financial analysts                             +11
    Utility-system construction                    Info-security analysts                        Paralegals                                     +11
    Commercial construction                        Engineers                                     Info-security analysts                         +9
    Electrical-equipment                           Other computer                         400    Market researchers                             +6
                                           200
    manufacturing                                  occupations                                   Lawyers                                        +3
                                                                                                 Translators                                    +1
                                                                                                 Writers & authors                                 -3
                                           100
                                                                                                 Graphic designers                                 -7
                                                                                          0      Bookkeeping clerks                                -9
                                                                                                 Customer service                                  -9
                                           0
                                                                                          -200   Data-entry keyers                                -18
   2023        2024          2025   2026         2023         2024          2025   2026                                   -20     0   20   40

                                                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                       | 107

Claude Cowork nuked $285B of public software value in Feb that was won back by Sept
  In January, Anthropic shipped Claude Cowork, an app that wrapped Claude Code to make it more usable by
  knowledge workers with their own ﬁles and business workﬂows. As the company added plugins for legal,
  marketing and ﬁnance, markets freaked out and investors called the end of seat-based pricing and repriced the
  terminal value of SaaS revenue.

  ● The “SaaSpocalypse” wiped out nearly $285B of                      XSW daily closing share price ($)
    software market capitalization in early February. The                   Claude Cowork               ChatGPT Work
                                                                                12 Jan                      9 Jul
    S&P 500 software and services index fell 26% from
    its October 2025 peak.                                                                  Codex app
  ● Hedge funds shorted $24B of software names in the                                         2 Feb

    year to date. The panic spread to cybersecurity after
    Claude Code Security launched on February 20.
                                                                                                           Claude Design
  ● XSW rose 55% from its April low to August’s peak,                                                          17 Apr
    before pulling back to +44% by 11 September.

                                                                                                    stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                          | 108

OpenAI and Anthropic set up their own consultancies, funded by private equity
  To accelerate enterprise adoption of their systems, the two labs launched services companies in May 2026 to
  provide deployment services, capitalized by the private equity ﬁrms whose portfolio companies are the customers.
  Their challenge, however, is being bounded to the stack of their parent company.
  ● Anthropic's venture with Blackstone, Hellman & Friedman and
                                                                                 Anthropic (Ode)         OpenAI (DeployCo)
    Goldman Sachs carries about $1.5B of committed capital.
  ● OpenAI's Deployment Company raised more than $4B at a            Capital     ~$1.5B committed        >$4B raised
    $10B pre-money valuation from 19 investors led by TPG.
    Reports suggest that investors get a guaranteed 17.5%            Valuation   Not disclosed           $10B pre-money

    minimum annual return with capped upside, closer to credit                   Blackstone, Hellman &
                                                                     Founding                            TPG, Advent, Bain
    than equity.                                                     partners
                                                                                 Friedman, Goldman
                                                                                 Sachs
                                                                                                         Capital, Brookﬁeld

  ● Both built their deployment companies from the acquisition
                                                                                                         OpenAI-controlled joint
    of smaller AI consultancies: Fractional AI for Anthropic and     Structure   Joint venture           venture, 17.5%
    Tomoro for OpenAI.                                                                                   guaranteed return




                                                                                                         stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                      | 109

So, is intelligence too cheap to meter?
  EpochAI ﬁnd that the price for a given level of performance has fallen about 47% per quarter, or 13x per year.
  This makes AI the fastest cost-reducing major technology paradigm since DNA sequencing.
         Newer models solve benchmarks for less $             The price of AI is falling faster than anything before it




                                                                                                        stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 110

Reasoning makes token price a poor proxy for the cost of an answer
  Artiﬁcial Analysis measures task cost from the number and price of input, cache, reasoning and answer tokens
  consumed across its evaluations. The economic unit is the completed task, and Anthropic’s frontier models have
  the highest measured task costs, reﬂecting both their token consumption and the prices applied to reasoning,
  cache and answer tokens.




                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 111

A dollar buys very different amounts of frontier benchmark performance
   Across 12 of the original 13 vendors, the highest-index eligible model ranges from 8.4 to 57.6 AA Index points
   per task-dollar, a 6.9x spread reﬂecting scores, token use, inference effort and pricing.




AA Index v4.3.2 / task cost, 2026-10-02. Non-Flash, non-lightweight, no fallback.
Inkling cost unavailable; Anthropic uses Opus 5, which AA marks superseded.                      stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                                          | 112

Sell the work, not the tools?
  As AI systems become more capable, the industry will increasingly value ﬁnished work over chats. But how will
  this change the business model of AI? As capability advances from Chat to Coding to Agent to Co-work to
  Autonomous AI, each level changes how the product is sold, from free chat and subscriptions to outcomes priced
  per completed task.
                                                                                                                                    Requires: judging the correctness
                                                                                                                                            of its own output
                                                                                                Requires: professionals review it
                                                                                                      rather than redo it
                                                              Requires: long-horizon planning
                                                                     and error recovery
                                                                                                                                        AUTONOMOUS AI
                                                                                                                                    Operates continuously without
                                Requires: veriﬁable results
                                                                                                         CO-WORK
                                                                                                                                             supervision
                                                                                                 Delivers reviewable work,
                                                                        AGENT                                                       Market: industry-wide upgrades
                                                                                                      priced per task
                                                                  Delivers a completed
                                       CODING                                                      Market: knowledge work
                                                                  multi-step task chain
                               Delivers runnable code, the
           CHAT
                                  ﬁrst objective check
  Delivers a single response      Market: software R&D
        Market: search



     Free or subscription          Subscription or API             Subscription or API          Subscription or task outcome                Task outcome



                                                                                                                                     stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                      | 113

Vertical AI companies post-train open models past the frontier in their own domain
  Frontier open Chinese models are handing application companies like Harvey, Cursor, and Mercor the opportunity
  to reduce costs and boost performance on the domains their customers care about.
  ● Harvey's post-trained GLM-5.2 runs in production at        Company                Open base   Reported result
    54.8% lower cost per cell than Sonnet 5, and scores
    0.903 on their Legal Review Table answer quality           Harvey                 GLM-5.2     0.903 answer score, ahead of
                                                               document review                    Fable 5 at 0.867
    against 0.867 for Fable 5.
  ● Mercor post-trained Qwen3.5-397B-A17B on 1,928             Cursor                 Kimi K2.5   25x more synthetic RL tasks
                                                               software engineering               than Composer 2
    expert tasks, raising overall Pass@1 on 480 held-out
    APEX-Agents tasks from 16.11% to 27.29%.                   Mercor                 Qwen3.5     16.11% to 27.29% Pass@1
                                                               law, banking,          397B-A17B   on held-out APEX-Agents
  ● In these settings, a company’s focus on a knowledge        consulting                         (overall)
    work vertical enables them to build the best graded task
    environments with expert data.



                                                                                                      stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 114

Production feedback guides improvements across the AI stack
  Companies can start with frontier APIs to ﬁnd product-market ﬁt, then build their own evaluations and tools.
  Production feedback shows where to improve the system. Post-training becomes worthwhile when proprietary
  data and gains in quality, latency or cost justify taking control of the model.

  ● Failed tasks become repeatable tests with the context,                The production learning loop
    tools and expert checks needed to judge success.
                                                                  1 Run real work            2 Capture feedback
  ● Corrections, retries and execution traces reveal
                                                               Record tasks, tool calls      Corrections, retries
    whether a failure came from missing context, a tool or         and outcomes               and action traces
    the model.
  ● Improvements can change memory, tools, routing or
    model weights, with each change tested before
                                                                 4 Improve and test              3 Build tests
    deployment.                                                 Update context, tools,       Replay failures with
                                                                 routing or weights          clear success checks



                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                   | 115

Agents now build and ﬁx customer service agents, and the customer's staff approve
  Customer service agents used to be built by the vendor's forward-deployed engineers, who turn a customer's
  policies into agent behavior, and ﬁxed by teams reading transcripts. Vendors now sell agents that do both: staff
  describe changes in plain English and approve ﬁxes the agent has already tested.
  ● Build: PolyAI says customers used Wren for
    87% of changes they deployed in the week of                          Builds agents from    Tests a ﬁx on        Reported result

    21 September, up from 52% in the week of 13           Sierra         SOPs, transcripts,
                                                                                               Simulations          None published
    July.                                                 Ghostwriter    whiteboard photos

  ● Fix: Decagon's Autopilot tests each ﬁx on past        Decagon        Its building agent,   Failing chat plus
                                                                                                                    93% vs 83% for staff
                                                          Autopilot      Duet                  a golden set
    conversations, then a person approves it. It
    beat certiﬁed Decagon staff on Decagon's              PolyAI Wren    Plain English, SOPs   Past and             87% of customer
                                                          and Cortex     and photos            simulated chats      changes via Wren
    own diagnostic benchmark, 93% to 83%.
  ● Speed: Decagon says engineering hours per             NiCE Cognigy
                                                                         Claude Code, Codex
                                                                         or Cursor
                                                                                               Not described        None published

    voice launch more than halved in six months,
    and time to go live fell about 37%.
                                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                          | 116

What training data is valuable? Execution traces and in-domain records
  Labs need examples of how work gets done, not just ﬁnished answers. Expert-corrected action traces can improve
  agents, while brokers now pay companies for operating records such as procedures, CRM histories and project
  archives.

  ● OpenAI and Thrive reused expert-corrected tax-agent traces.                      Execution traces          In-domain records

    Documents ﬁled at ≥75% accuracy rose from 25% to 86% within                                             Private company
                                                                                  Every step, tool call and
                                                                      What it                               records, or material
    six weeks.                                                        contains
                                                                                  expert correction of a
                                                                                                            written to order by paid
                                                                                  real task
  ● micro1 offers $100k to $1M+ to license company procedures and                                           experts

    records. Mercor says enterprise data partnerships can pay more    Why it is   Shows the decisions       Covers a ﬁeld with
                                                                      useful      behind the answer         little public data
    than $10M.
  ● These are different assets: traces reveal decisions and                       Coding agent tool calls, Clinical notes, internal
                                                                      Example
                                                                                  customer support steps policies
    corrections, while company archives supply domain context.
    Broker payment claims are company-reported.



                                                                                                        stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                  | 117

Teaching AI is now generating billions of dollars in revenue
  More and more RL environment companies are springing up thanks to a positive feedback loop drives demand:
  labs release models and invite community testing with evals and environments they create. These evals are hotly
  contested and observed because they expose strengths and gaps, so labs buy targeted data, improve models and
  release again, revealing new gaps…



       Mercor              Handshake AI                  micro1              Surge AI               Scale AI

         $2B                Nearly $1B                  >$500M                $1.2B            Just under $1B
       Jun 2026                 Apr 2026                 Sep 2026             FY 2024                FY 2025
     Gross annualized    Gross annualized · AI only   Annualized revenue   Full-year revenue      Full-year revenue


      $75M · Feb ’25       $100M · by Oct ’25          $7M · early ’25      $1.2B · FY ’24         $250M · FY ’22
     $500M · Sep ’25        $550M · Jan ’26           >$300M · Apr ’26                             $870M · FY ’24
       $2B · Jun ’26       Nearly $1B · Apr ’26       >$500M · Sep ’26                         Just under $1B · FY ’25

                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                                                   | 118

Medicines from AI-ﬁrst drug discovery have reached Phase 3
   What does it really mean for a medicine to be “made by AI”? The answer differs by company, so this table
   summarizes key assets and how AI was used. Two programs have reached Phase 3, with primary completion
   expected in 2028-29. Faster discovery has yet to establish higher clinical success rates.
 Company                Medicine                        The role of AI in the program                            Current program status

                        GB-0895                         ML-guided optimization reached 106 fM binding to         Phase 3. Two 786-patient trials of twice-yearly dosing.
                        antibody, severe asthma         TSLP, about 20x tighter than tezepelumab.                Primary completion estimated Dec 2028 / Jan 2029.

                        rentosertib                     PandaOmics ranked TNIK ﬁrst among kinases from           Phase 3. 320 patients, 52 weeks, 47 sites in China.
                        TNIK pill, lung ﬁbrosis (IPF)   omics and text data. Chemistry42 generated inhibitors.   Estimated primary completion: Oct 2029.

                        ENV-294                         Transformers pretrained on 1.2B mass spectra predict     Phase 2a. Placebo-controlled eczema and asthma trials
                        pill for eczema and asthma      the structures of unknown molecules made by living       underway. Phase 1b: mean eczema severity fell 85% by day
                                                        organisms.                                               42 (n=9, no placebo).

                        REC-4881                        Deep learning on microscopy of APC-deﬁcient cells        Phase 2. Median polyp burden fell 43% at week 13 (n=12,
                        ex-Takeda MEK pill, polyposis   ranked thousands of compounds by phenotype rescue.       no placebo). FDA path update due H2 2026.

                        IAM1363                         NeuralPLexer, a diffusion model, predicts drug-protein   Phase 1/1b. Partial responses in 28% of 18 pretreated
                        HER2 pill, solid tumors         structures. Enchant predicts clinical endpoints.         patients at 960 mg a day or more (Oct 2025).

Note: Enveda status company-conﬁrmed Oct 7, 2026. Other statuses checked Sept 19; trial dates updated Sept 24.                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                       | 119

Muse brings Zuckerberg’s “personal superintelligence” vision to market
  In July 2025, Zuckerberg promised “personal superintelligence for everyone”: AI that helps people pursue their
  own goals. Muse gives each user a persistent cloud computer to act across apps. Commerce and enterprise turn
  that vision into services people and businesses can pay for.

  ● Consumer pull: 2.8M downloads in two weeks and No. 1 on US app
    charts, after Llama 4’s poor reception and Meta AI’s earlier app
    struggles. Meta shares rose >11% on September 21.
  ● Commerce: A step toward our 2025 prediction. Stripe Link enables
    checkout at 1M+ merchants, and Shopify, Walmart, Shop Pay and
    PayPal partnerships connect discovery to payment.
  ● Enterprise: Ex-MongoDB CEO CJ Desai will sell APIs, coding tools and
                                                                               Muse Charm: a Tamagotchi-like device
    business agents. Inference demand helps monetize Meta Compute,             previewed at Connect. Muse is also coming
    and direct compute sales are under consideration.                          to Meta’s AI glasses.




                                                                                                       stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                   | 120

AI shopping referrals are growing quickly and converting at higher rates
  AI assistants help shoppers compare products and narrow their choices before visiting a retailer. While direct AI
  referrals remain a small share of ecommerce trafﬁc, their rapid growth and higher conversion rates suggest an
  increasingly valuable source of customers.
  ● Similarweb reports 203% annual growth in AI                 AI vs. non-AI purchase conversion on US retail sites
    referrals, which still account for only 0.4% of              Relative difference, measured by Adobe Analytics

    retail ecommerce visits.
  ● Shopify’s AI-referred product-page visitors
    converted about 80% more often than
    organic-search visitors in Q2 2026.
  ● Profound ﬁnds that retail brand mentions in
    ChatGPT were followed by 38% more site visits
    than the forecast baseline over seven days.



                                                                                                      stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                             | 121

Cloud backlogs are growing, and neocloud revenues are ramping even quicker
   Big cloud’s reported backlog reached $1.69T in June 2026, while CoreWeave’s quarterly revenue reached $2.58B.


                     Big cloud: contracted future revenue ($B)                              Quarterly revenue ($B)
                                                                                    3



                                                                                    2



                                                                                    1



                                                                                    0
                                                                                        0    5     10    15    20     25    30
                                                                                            Quarters since launch / pivot
Note: Backlog includes non-AI business. Alphabet added shorter contracts in 2026.                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                        | 122

Neoclouds have contracted >15GW of AI compute…and are racing to get it live
   The lag between contracting compute and getting it live is down to atoms: ﬁnding the site, gaining approvals,
   building, energising, and installing equipment before customers can start running jobs. For example, CoreWeave
   ended Q2 2026 with 1.5GW of active power against 4.2GW of contracted, and targets more than 8GW by 2030. On
   pricing, immediacy commands a premium: short-duration capacity clears ~$40 to $50M per MW versus ~$20 to
   $25M on multi-year deals.




Data as of Q2 2026.                                                                           stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 123

Crypto miners are pivoting from further behind: 5.6GW contracted vs. 900MW live
   Applied Digital and Core Scientiﬁc (whose $9B acquisition by CoreWeave was rejected by the board in Oct-25)
   lead on contracted power with 2.5GW, of which 25% is live. The AI power is net-new build on grid interconnects
   and land these companies already held as Bitcoin miners. Several are converting old mining sites and shrinking
   Bitcoin to free the power. The tenants concentrate into a short list: CoreWeave, Fluidstack, AWS, and Microsoft.




Data as of Q2 2026.                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                                    | 124

AI takes most capex as hyperscaler budgets head above $1T annually
  Exponential View estimates AI accounts for 64% of seven cloud companies’ planned 2026 capex, or about $563B.
  Separately, Bloomberg consensus for ﬁve hyperscalers forecasts total capex above $1T annually from 2027
  through 2030.

                 Estimated AI share of capex (%)                                       Total annual capex forecasts hit $1T
                     2026: ~$563B AI / $879B total                                                 Annual total capex ($B)




 Source: Exponential View, Sep 27. Adds CoreWeave and Nebius to the ﬁve   Source: Vanguard / Bloomberg, Jul 31. Alphabet, Amazon, Meta, Microsoft and
 hyperscalers at right. Modeled AI share.                                 Oracle. E = forecast.
                                                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                 | 125

AI build-out draws on chipmaker guarantees and hyperscaler equity
  NVIDIA and Broadcom expanded guarantees for infrastructure funded by outside investors. Customer defaults
  could cost them both sales and guarantee payments, though NVIDIA argues independent underwriting and
  reusable hardware reduce this risk. Separately, hyperscalers are selling equity: Alphabet raised $49.6B net in
  June, including $10B from Berkshire, for corporate uses including AI infrastructure and compute.

   2026 arrangement            Financing and chipmaker support               Risk retained by the chipmaker

   NVIDIA / OpenAI             Up to $105B of guarantees                     Covers speciﬁed default shortfalls after
   and SB Energy               for speciﬁed lease and power payments         recoveries. Effective as leases commence.

   Broadcom / Apollo           $35B ﬁnancing, with up to $29B                Covers part of default losses after
   and Blackstone              of Broadcom lease backstop exposure           recovering value from the AI racks.

   NVIDIA / six ﬁnancial       >$500B ﬁnancing target. Potential residual-   May absorb shortfalls in the
   institutions                value support up to 25% per selected deal.    infrastructure’s future asset value.


                                                                                                     stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 126

Residual value guarantees spread from Meta’s data centers to the chipmakers
  A residual value guarantee promises lenders a minimum resale value for a data center or its chips. The debt is
  held in a separate company that owns the asset (SPV), so it is off the balance sheet of the guarantor. Morgan
  Stanley designed the structure for Meta’s Hyperion campus in October 2025, and it has become popular since.
  ● Four guarantees issued in under 12 months sum               Maximum contingent exposure by deal
    to $175B: Meta $41B, Broadcom $29B and
    NVIDIA $105B.
  ● Guaranteed debt prices just 100-150bp above
    the guarantor’s own bonds, which let Hyperion
    raise a whopping $27B.
  ● NVIDIA records no liability until OpenAI’s Ohio
    leases begin in 2028, and the campus will run
    only NVIDIA hardware for 20 years.



                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 127

Hyperscalers and chipmakers hold over $3T of commitments off their balance sheets
  Morgan Stanley counts more than $3T of off-balance-sheet commitments and credit support across seven
  hyperscalers and chipmakers. Most are purchase commitments and leases on data centers that have not opened
  yet. These are contracted future payments rather than borrowings, so they sit outside reported debt.
  ● Google carries the most at $890B, with $707B of       Off balance sheet and contingent commitments by company
    it in purchase commitments, while Microsoft and
    Oracle are mostly leases.
  ● S&P forecasts Amazon’s adjusted debt at 1.6x
    EBITDA in 2027, above its 1.5x downgrade
    threshold, and Oracle’s at 4.4x against 4.5x.
  ● S&P adds a guarantee to debt only where it
    exceeds a stressed sale value, a gap it calls
    “closer to zero most of the time.”



                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                           | 128

GPUs now cost more than they did at their lows
   On-demand pricing for 10 GPU SKUs bottomed across seven quarters between Q3 2024 and Q1 2026, most of
   them in Q3 2025. Since then the weakest bounce was +7% (A100) and the strongest +60% (MI300X), with the
   average +30%. Even the nine-year-old V100 now costs 43% more than in Sept-25.




† Three chips whose low is also their ﬁrst month in the index, their price never fell during the observed window.   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 129

A100 and V100 remain rentable six and nine years after launch
  How long GPUs can earn is central to the depreciation debate. September 2026 median posted rents are
  $1.76/hour for A100 and $0.95 for V100. Older generations remain commercially available, but list rates alone
  cannot establish proﬁtability or the right accounting life. Those depend on paid utilization, operating costs and
  when each asset entered service.



                                 6+ years since launch   Under 6 years since launch




                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                        | 130

Six years after launch, A100 still leads NVIDIA chip mentions in AI papers
  Launched in May 2020, A100 remains the NVIDIA chip whose use is reported most often in open-source AI
  papers, ahead of H100 and H200 combined. A new generation does not end the previous one's research use. The
  2026 counts include a projection for the rest of the year.
   ● A100 reaches 14,707 papers in the 2026 estimate:        AI papers citing each NVIDIA chip (others in gray)
     96% of its 2025 count and 85% of its 2024 peak.
   ● Hopper (H100 and H200) more than doubles to
     9,931 papers. Data center Blackwell reaches 902,
     still far behind A100.
   ● This shows lasting research use. Paper mentions do
     not measure ﬂeet utilization, rental income or
     proﬁtability.




                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 131

AI buyers are outbidding the grid for the machines that make electricity
  GE Vernova, Siemens Energy and Mitsubishi Heavy Industries have backlog orders worth 220 GW of large-frame
  gas turbines against a global build rate of 60-70 GW/year. They’re requiring up-front cash deposits - $87B worth
  as of 30 June ‘26 - to hold a future manufacturing slot and are credited on delivery against the purchase price.
 ● GE Vernova expects its gas equipment backlog and slot
   reservation agreements to be at least 125 GW by EO26. Its own
   output capacity is 20 GW a year, reaching 30 GW in 2030. Data
   center orders passed $5B year to date, more than double all of
   2025. Chart shows GEV gas turbines orders vs deliveries.
 ● Siemens Energy can deliver 15-16 GW in 2026 vs. demand for 69
   GW, with longer than 3 year lead times.
 ● Mitsubishi's orders taken last quarter are scheduled for delivery
   in 2028 to 2030.
 ● Turbine prices are up 195% since 2019, which is driving new
   vendors like Boom Supersonic to repurpose their jet turbine
   towards energy production for data centers.                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 132

Retired coal sites are being rebuilt as gigawatt-scale gas campuses for AI
  AI is reversing coal’s retirement plan: the US had planned to retire 8.5 GW worth of coal capacity by EO2025, but
  only ended up retiring 2.6 GW worth. The rest was pushed out into the future or cancelled outright. The reason?
  Developers are buying the grid interconnection, substations, water and permitting that’s already in place to skip
  multi-year long queues for new connections.
 ● To be clear, AI isn’t exactly saving coal plants. But when load
   forecasts increase, data center agreements feed the utility's
   resource plan, and a resource plan that is short of capacity can no
   longer afford retirement.
 ● Homer City in Pennsylvania hosts the state's largest coal plant that
   used to generate 2 GW. It was demolished in 2025 and is now being
   redeveloped with $10B into a 4.4 GW natural gas-powered site with
   GE Vernova turbines to power a large-scale AI data center. While
   there is no anchor tenant, Amazon is reportedly in talks.


                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                    | 133

Five American clusters, each larger than those in the European Union combined
  The EU-27 holds 79,657 H100-equivalents of installed AI compute, or 5% of Epoch’s documented sample
  excluding China. One phase of xAI’s Memphis site holds 3.5x that.

 ● xAI's Colossus Memphis Phase 3 alone holds                      EU-27 total

   3.5 times the entire EU total.
 ● Excluding China, the EU-27 holds 5% of
   documented AI compute vs. 80% in the US.
 ● Europe's largest machine, JUPITER at Jülich,
   would not make the American top-10.
 ● Norway has more installed AI compute than
   France. The UK has less than Finland




                                                                                          stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 134

Four US hyperscalers will spend $733B in total capex in 2026, Europe commits €1B
  The US build-out is led by hyperscalers with large balance sheets. Europe’s gigafactory push relies on public
  procurement to draw in private capital. The €1B EU commitment is an initial program contribution, while $733B is
  US hyperscalers’ total annual capex, not an AI-only ﬁgure.
   ● The big 4 spending grew by $349B in 2026
     alone as they all raised guidance.
   ● That increase on its own is more than 10x the
     entire EU program.
   ● Bidding opened in July 2026 and will close in
     mid-November 2026.
   ● First construction is due for 2027 for
     operation in 2028.




                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                      | 135

ASML sold six more EUV machines in 2025 than 2021, at a 61% higher average price
  ASML’s EUV system sales rose from 42 in 2021 to 48 in 2025. Over the same period, average revenue per machine
  rose from about €150M to €242M, a 61% increase. Higher prices and the changing product mix helped revenue
  grow faster than the number of systems sold.




                                                                                            stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                        | 136

Leaders can’t be choosers: labs assemble diversiﬁed compute portfolios
  Frontier labs spread compute across NVIDIA, AMD, TPUs, Trainium and custom chips. Announced gigawatts include
  plans and signed agreements, with overlapping deals that cannot be summed into a contracted or operating total.

                                                                        Selected announced capacity
  ● OpenAI committed to 2 GW of Trainium and 0.75 GW of
    Cerebras, alongside its 10 GW Broadcom roadmap.
  ● Anthropic names 5 GW of Google TPUs and up to 5 GW
    from AWS, plus NVIDIA capacity through Azure and
    SpaceX.
  ● The portfolio now extends to CPUs: Anthropic's
    September Akamai agreement commits $11.6B over
    seven years.




                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 137

NVIDIA faces different challengers in training and inference
  NVIDIA’s challengers span established chip vendors, in-house silicon and independent AI chip companies. Their
  deployment ranges from large production clusters to ﬁrst shipments and chips still in development.

   Commercial platforms           In-house silicon             Independent AI chips        China alternatives


                               TPU             Trainium       WSE-3          RDU
        Instinct                                                                                Ascend
                                                                                Etched
                                                       Meta    Corsair     First rack
                                Maia            MTIA
         Gaudi                                                                                   MLU
                                                               RNGD        Rebel100
                                                                                                   Kunlunxin
                                         Jalapeño
        Blackhole                    Deployment planned        In dev.      In dev.             P800


                                                              craftwerk      DX-1
                    Training   Inference                         In dev       In dev

                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                       | 138

Google’s Ironwood serves Qwen at lower modeled cost than B200 and B300
  Google is opening its TPU software stack to models beyond Gemini. SemiAnalysis tested Qwen3.5-397B on
  Ironwood using TorchTPU, which lets PyTorch models run on TPUs. At the same generation speed, its estimated
  cost per token was lower than NVIDIA’s B200 and B300.
  ● At 100 output tokens per second per user, Ironwood         Cost per million tokens at matched generation
    costs an estimated $0.181 per million input and output                         speed
    tokens, versus $0.222 for B200 and $0.276 for B300.
  ● The test uses FP8 precision, 8,000 input tokens and
    1,000 output tokens, with input processing and
    generation on the same hardware. Note that these are
    ownership-cost estimates, not API prices.
  ● NVIDIA can regain the lead with FP4 precision or
    separate hardware for input processing and generation.
    TorchTPU still needs broader model support and
    serving optimizations.
                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                      | 139

But just as rivals catch Blackwell, NVIDIA moves the goalposts again
  Google’s results show that alternatives to NVIDIA can compete on inference cost. But the comparison keeps
  changing: SemiAnalysis’s early Rubin tests show another substantial improvement over Blackwell on workloads
  that reproduce how agents use models.
  ● Running DeepSeek V4 Pro at a matched response speed of       Throughput at matched response speed
    100 tokens per second, Rubin delivers 2.1x the total token
    throughput per megawatt of the strongest tested GB300
    conﬁguration.
  ● At that speed, GB300 reaches 28.5 million tokens per
    second per megawatt with SGLang, versus 21.1 million with
    TensorRT-LLM.
  ● This suggests that winning workloads from NVIDIA means
    competing with its next generation while improving your
    own software. Although Google now has credible results,
    NVIDIA has hardly stopped to admire them.
                                                                                            stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 140

Better systems help Huawei compete, but memory still limits supply
  Huawei’s Atlas 950 roadmap connects up to 8,192 chips, while software is being tuned for Chinese models. Its
  chair says Ascend has surpassed NVIDIA in China, while acknowledging NVIDIA’s market share is hard to measure.
  Supply remains tight and H200 sales in China require both U.S. licenses and Chinese approval.
  ● SemiAnalysis’s June 2026 analysis found launch-day                Memory and access for Chinese buyers
    DeepSeek V4 support and live API serving on Ascend.
                                                               Chip       Memory     Bandwidth      China access
    Huawei’s software overlaps computation and data
    transfers to keep chips busy.                                                                 Early use reported,
                                                              Huawei
  ● Memory limits deployment: reports that DeepSeek’s         950DT
                                                                           144 GB      4 TB/s          but supply
    planned order of at least 160,000 950DTs could take                                               constrained

    over a year to ﬁll. Other reports card quotes up                                               Approved buyers
                                                              NVIDIA
    20-50% in two months.                                                  141 GB     4.8 TB/s       with limited
                                                               H200
                                                                                                      deliveries




                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                | 141

Despite competition, NVIDIA remains the default chip in AI research papers
  Last year, chip mentions in open-source AI papers fell for the ﬁrst time in six years. Zeta Alpha's 2026 projection,
  based on counts to 1 September, has them rebounding: 44,134 papers cite NVIDIA, up 9.5%. That is about 90% of
  all accelerator mentions, the same share as in 2025.
   ● AMD mentions grow fastest, up 62% to 406 papers,               AI papers citing each chip family (log scale)
     followed by Huawei’s Ascend, up 52% to 208.
   ● Apple silicon rises 43% to 1,062 papers, nearly level
     with Google's TPU.
   ● TPU mentions, however, fall for a second year, to
     1,120 from a peak of 1,702 in 2024.




                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 142

Jensen Huang writes in defense of open-weight models
  A week after Moonshot's open-weight Kimi K3 topped an LMArena board and reports circulated that the White
  House was weighing conditions on US companies that use Chinese models, Jensen’s goes direct on X to publish an
  open letter, “Open weights and American AI leadership”. Huang’s version of Jevon’s Paradox: “Whenever there’s
  more use, you’ll have to sell a lot more NVIDIA computers.”
  ● The letter launched with 25 signatories and                            Cumulative new HF repos >500 downloads
    now lists 235, including OpenAI, Google,                                        by org since Jan 2025
    Meta, Microsoft and AMD. Anthropic is
    absent.
  ● It asks Washington to avoid “premature
    restrictions on open models” and not to
    conﬂate distillation with misappropriation.
  ● NVIDIA has added about 860 popular repos
    on HF since Jan 2025, nearly twice runner-up
    Alibaba.
                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                  | 143

Then, NVIDIA commits almost $20B to open weight AI in two weeks
  NVIDIA committed about $19.9B across two deals: $12.93B for Hugging Face and $7B in Poolside licensing and
  equity. One brings the distribution platform for open models, while the other brings a model factory and research
  staff. Hugging Face’s acquisition is expected to close in H1 2027.




  $12.93B acquisition, agreed 3 September 2026                $6B license plus $1B of equity, 21 August 2026
  Hugging Face keeps its brand and stays open to every        Non-exclusive licensing deal and $1B investment at $12B
  model, cloud and chip. Close expected in H1 2027.           pre-money valuation. Poolside founders don’t join NVIDIA.


  NVIDIA gets distribution and mindshare                      NVIDIA gets a model factory and team
  The town hall for open AI: 18M users share 3M models, and   The Model Factory trains and tests Poolside’s open-weight
  200,000 companies use it to ﬁnd and deploy them. Every      Laguna coding models. NVIDIA offered jobs to 109 staff,
  open lab launches there, from Qwen and Kimi to NVIDIA’s     while fewer than 115 engineers and researchers built
  own Nemotron.                                               Laguna.

                                                                                                      stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                            | 144

NVIDIA buys, funds, and open sources the AI stack
  NVIDIA participated in 84 AI funding rounds this year, roughly twice it's 2024 total, helping ﬁnance demand for its
  own chips. NVIDIA's investments and acquisitions span the AI stack to complement its open model releases and
  optimizations of other labs’ models for its hardware.




            Note: left tile data from 16 Sept 2026 (Dealroom) and right tile data from 24 Sept 2026 (Hugging Face)   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                        | 145

One year on: Waymo tripled to 220M rider-only miles and serves 500k rides a week
  In last year’s report, Waymo had logged 71M rider-only miles through March 2025. Waymo’s safety hub now shows
  220M through March 2026, over 4M a week, with 94% fewer serious-injury crashes than human drivers on the
  same roads. Paid rides doubled to 500k+ a week across 14 US cities, with a stated target of 1M a week by EO26.
  ● Meanwhile, Tesla’s paid robotaxi miles reached 2.4M     Waymo rider-only miles     Waymo paid rides per week
    by June 2026, adding ~0.9M in Q2 and the same in Q1.
  ● Waymo added Miami, Dallas, Houston, San Antonio,
    Orlando, Nashville, Denver, San Diego and Tampa since
    last year’s report.
  ● In the UK, Waymo has tested in London since April and
    targets a Q4 driverless launch. Wayve and Uber now
    offer paid, supervised autonomous rides in London,
    with a licensed driver onboard.
  ● In China, Baidu’s Apollo Go fell from 3.2M driverless
    rides in Q1 to around 1M in Q2, citing “operational
    adjustments” on regulatory grounds.
                                                                                            stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                              | 146

Data center developers are deploying robots to speed up construction
  Today, robots are fabricating components, printing layouts and drilling anchors for data centers. More recent
  dexterous systems are also being used for equipment ﬁt-out. While evidence of faster completion of entire
  facilities remains limited so far, contractors and suppliers report gains on speciﬁc tasks that we highlight below:
         Fabricate                      Lay out                         Drill                        Fit out




      ~12x per-welder             784 hours saved on          90k+ holes drilled with
       throughput for              layout supporting           99.97% accuracy in           Reported operations in
    structural assembly               2,304 racks               depth and location             hyperscaler DCs

                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                      | 147

Physical AI companies will clean your home…for data
  Human labor is now a loss leader for robot data. Germany’s microagi offers Shift, a service to clean your NYC
  apartment for free while its operator's headcam records the entire thing. Meanwhile, Figure's Index has paid
  $15M to 264k people in 100+ countries to ﬁlm daily chores from a headset, producing 16M videos toward what it
  calls the world's largest physical dataset.




                                                                                            stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                    | 148

Unitree’s rapid growth is already proﬁtable
   Unitree grew revenue 333% to approximately $238M in 2025, earning $39M in net proﬁt. Its 16% group net
   margin approached FANUC’s 20%, despite operating at a much smaller scale. Humanoid sales rose from 412 in
   2024 to 5,215 in 2025 (12.7x), while average price fell 36%, from RMB260,400 to RMB166,400. Humanoid gross
   margin fell from 69% to 63%.

      Company                         Main business                                     Revenue growth     Net margin

                                      Humanoids, quadrupeds and components                 333%              16%

                                      Humanoids, education and consumer robots              53%              -39%

                                      Industrial robots, automation and machine tools        8%              20%

                                      Industrial robots, motors and drives                   1%               7%



Note: Group results; ﬁscal years and product mixes differ.                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 149

The physical AI stack is powered by billions and billions of venture capital dollars
  There’s never been a more vibrant robotics research environment in the last decade. And this has translated into
  huge capital ﬂows in 2026 for robotics labs, humanoid makers and autonomy companies that would have been
  unthinkable a few years ago, with hyperscalers, carmakers and sovereign funds backing up the truck.
  ● Skild AI raised $1.4B at >$14B valuation, led by
    SoftBank with NVIDIA, tripling its valuation in seven
    months, and Apptronik closed a $935M Series A with
    Google, Mercedes-Benz and John Deere.
  ● Wayve raised $1.2B at $8.6B with Uber committing
    milestone capital that takes the total to $1.5B, and
    Rivian's spin-out Mind Robotics raised $500M at
    about $2B four months after its seed.
  ● Humanoid ﬁnancings included NEURA (up to $1.4B),
    XPENG Robotics (>$900M), Galbot (~$362M, per
    Caixin), ROBOTERA (>$200M), LimX (nearly $200M)
    and Humanoid ($152M).                                                                       stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                        | 150

Chinese humanoid companies attract slightly less than two-thirds of global funding
  Dealroom tracks 18 humanoid companies in China, 18 in the US and 17 in Europe, yet China leads in funding. US
  restrictions on new foreign-made robot approvals could redirect demand toward domestic production, while
  complicating access to Chinese hardware used by American researchers.




                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                 | 151

Private capital is only interested in AI companies, and largely American ones

             GenAI takes $5 of every $6                US companies take about three of
             in the year’s biggest rounds              every four AI dollars




                                                                                          stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                       | 152

Private AI valuations have risen fast, very fast
  Across the companies shown, estimated valuation-doubling times range from 3.5 to 13.3 months. These historical
  ﬁts describe fundraising marks, not a law that valuations must continue to follow.




                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                        | 153

AI company revenue multiples range widely, even among the largest labs
  The latest marks shown range from 15x for Anthropic to 250x for xAI, with OpenAI at 21x and Cohere at 83x.
  Reported and estimated revenue ﬁgures are mixed, so the chart is a snapshot of market pricing rather than a
  like-for-like valuation rule.




                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                    | 154

The labs are raising capital at the scale of hyperscale capex
  Amazon, Alphabet, Microsoft and Meta guide to $733B in 2026 capex, up 79% from $410B in 2025. OpenAI and
  Anthropic have announced $122B and $95B of funding, respectively, in 2026.



                                                                 Capex growth: 2026 guidance vs. 2025

                                                                 Amazon                        +71%
                                                                 Alphabet                     +119%
                                                                 Microsoft                     +48%
                                                                 Meta                          +90%
                                                                 All four combined             +79%




                                                                                            stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 155

Gulf investors participate in some of the largest American AI rounds
  Dealroom tracks who participates in ﬁnancing rounds. MENA investors took part in rounds representing half of AI
  funding dollars in 2026. This counts the full value of those rounds, not the amount of capital supplied by Gulf
  investors.




                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                    | 156

Mega rounds continue to eat the lion’s share of private AI company raises
  94% of all dollars invested into companies in 2026 were part of $250M+ rounds, up from 10% in 2022…




            Note: The 2015 spike is one deal, Alibaba’s $1B investment into Alibaba Cloud.   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                        | 157

China’s AI IPO wave has delivered big gains and rich valuations
  Share-price gains imply ~$548B of enterprise-value uplift since IPO at constant capital structures, 87% coming
  from gains posted by DRAM company, CXMT. At September 18 prices, the ﬁve names trade at 19-189x trailing
  revenue, the highest multiple being held by Z.ai
 ● The IPO cohort spans model developers,          Shar price gain since IPO           Revenue multiples
   GPU designers and CXMT’s DRAM business.
 ● Micron and SK hynix also sell NAND
   storage and high-bandwidth memory, so
   their product mix differs.
 ● US labs use older private-round equity
   values and annualized sales. These gray
   bars give context but are not like-for-like
   public multiples.

                                                    Implied EV uplift: ~$548B           Public: EV / trailing revenue.
                                                        87% from CXMT              *US labs: equity / annualized revenue.
                                                                                                      stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                     | 158

Is the ROI on NVIDIA better than its Western competitors? Yes.
   Across modeled rounds in eight Western challengers, $17.3B invested produces $54.9B of estimated NAV plus
   $7.7B of distributions (3.6x), versus $80.6B in NVIDIA (4.7x). Recent mega-rounds, invested after NVIDIA’s huge
   run-up, compress the multiples: $11.7B of 2026 funding pulls NVIDIA from 12.2x for older cohorts to 4.7x overall.




As of 25 Sep 2026. Modeled rounds, not all funding. Dates, valuation assumptions and coverage gaps are in the linked model.   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                     | 159

Chinese NVIDIA competitors, however, produced higher ROI
   The pattern reverses in China: $12.4B across modeled rounds in six challengers produces $108.5B of estimated
   investor NAV (8.8x), versus $91.6B (7.4x) if the same dollars bought NVIDIA on each funding date. Returns follow
   investors’ shares through dilution and IPOs. Unpriced early rounds are excluded symmetrically.




As of 25 Sep 2026. Modeled rounds, not all funding. Dates, valuation assumptions and coverage gaps are in the linked model.   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 160

Leverage ampliﬁed the reversal in the AI memory trade
  Korean retail investors returned to memory stocks with margin loans and leveraged ETFs. When the trade
  reversed in July, forced liquidations at 10 brokers reached ₩43.9B a day, 13x a year earlier. The same memory
  shock hit leveraged institutional investors.
   ● Retail bought ₩8.9T of 2x ETFs in four weeks,               Daily forced liquidations at 10 brokers (KRW)
     alongside record ₩37.3T margin loans. Leveraged
     SK Hynix ETFs lost 67-69% in July.
   ● The Kospi fell 22% that month. The chart shows
     daily forced liquidation value and affected accounts
     at 10 brokers.
   ● The FT ranks Situational Awareness’s reported $35B
     July loss above Archegos and LTCM in its selected
     historical comparison.



                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions              | 161

The IPO window is thawing while M&A picks up with $B+ deals




                                                                       stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions              | 162

Big tech found a way to buy teams without buying their employer




                                                                       stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions              | 163




                                      Section 3: Politics




                                                                       stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 164

Welcome to the era of Super Intelligence, Superintelligence, or just SI…
  “No one knows what it means, but it’s provocative. It gets the people going.”

             Tech executives in 2025               Trump signs the Super Intelligence Executive Order in 2026




                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                              | 165

Washington has ﬂexed its control over frontier AI
  Washington need not own frontier labs to control model access. US export controls halted Fable and Mythos in
  June, with Fable returning in July. In September, Politico reported a White House request for US review before
  OpenAI and Anthropic shared new models with UK testers. Access had not ended across the board: Britain's AI
  Security Institute tested GPT-6 Astra before release earlier that month. As we wrote on Air Street Press on 22
  June, “Europe cannot rent its way to AI sovereignty: When Washington can disable a model overnight, the question is
  not whether AI is safe but who controls it.”

                 June 12: Blocked                                           July 1: Fable returns




                                                                                                    stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 166

Anthropic vs. US Government: who deﬁnes the limits of AI usage in defense
  The labs’ courtship of the Pentagon has exposed a critical question: can an AI lab set limits on the military’s use
  of its AI systems? Anthropic refused domestic mass surveillance and fully autonomous lethal weapons. The
  government treated its objections as grounds for exclusion, and the ﬁght went to court. Anthropic overturned one
  designation, but a September appeals ruling upheld its exclusion from the Pentagon’s supply chain.

  ● US Secretary of War, Pete Hegseth, considered forcing Anthropic’s
    cooperation under the Defense Production Act, then labeled it a
    supply-chain risk. Essential supplier or security threat?
  ● Ofﬁcials kept pursuing a contract and discussing Mythos cooperation
    after the designation. The California court noted the contradiction.
  ● On August 27, a California court found unlawful retaliation and set aside
    the 10 U.S.C. §3252 designation. On September 25, the D.C. Circuit
    upheld the separate 41 U.S.C. §4713 procurement exclusion.



                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                | 167

Frontier AI goes live in US military operations
   Frontier AI now supports live US military operations, from a raid in Venezuela to the war in Iran. The Pentagon
   describes AI as supporting human judgment. CNN’s reported near miss involving a Chinese ship shows how false
   AI-generated intelligence can still reach an operational plan.

             Jan 3, 2026                                   During Iran war            Feb-Apr 2026                Spring 2026


   Claude in the Maduro raid                        Grok within Maven            Maven at campaign scale   A near miss at sea

   Axios reports Claude was                         The Pentagon says            The Pentagon says         CNN reports an AI error
   used during the raid that                        Grok-enabled Maven           Palantir’s Maven Smart    falsely linked a Chinese
   captured Nicolás Maduro.                         workﬂows helped US forces    System supported a        ship’s cargo to nuclear
   Its precise role was not                         deploy over 2,000            campaign hitting 13,000   weapons. US troops
   conﬁrmed.                                        munitions at 2,000 targets   targets in 38 days.       prepared to board before
                                                    within 96 hours.                                       ofﬁcials caught the error.


Note: Overlapping events, not to scale; Grok’s 96-hour interval is undated.                                       stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 168

Iran turned US commercial cloud infrastructure into an explicit military target set
  On March 1, Iranian drones directly struck two AWS facilities in the UAE. A nearby strike damaged AWS
  infrastructure in Bahrain. Iran then mapped 29 technology facilities as targets, separately named 18
  organizations “legitimate targets,” and threatened Stargate UAE. July brought another claimed attack in Bahrain,
  with satellite-observed damage but no AWS conﬁrmation.




                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                     | 169

Outside the US and China, 67 countries have sovereign AI projects
  CNAS tracks 184 government-backed AI projects in 67 countries outside the US and China, up from 18 announced
  in 2023. Their disclosed budgets total about $84B with the UAE and Japan accounting for nearly two-thirds,
  mostly via Stargate UAE and a national foundation model push.

  Sovereign AI projects tracked by CNAS, cumulative




                                                                                           stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                        | 170

Selected sovereign AI program pledges total about $138B




Note: Program pledges, not spending. CNAS’s ~$84B covers disclosed project budgets in a different country set.
                                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 171

NVIDIA earned over $30B from sovereign AI in FY2026
   Governments building domestic AI capacity still depend on US suppliers. CNAS names NVIDIA on 53 sovereign
   infrastructure projects, versus 18 for HPE, the next vendor. HUMAIN's live Saudi cloud shows AMD is winning
   business too.
    ● Planned NVIDIA deployments include Kazakhstan's                Sovereign projects naming each vendor
      100,000-GPU cluster, Japan's 27,500-GPU Noetra
      factory and HUMAIN's up to 600,000 GPUs across
      Saudi Arabia and the US.
    ● Saudi delivery is starting: HUMAIN and its partners
      report a live AMD cloud since August 2026, without
      disclosing operating MW, GPU count or customer
      names. More AMD capacity is due from H2 2027.
      Oxagon's ﬁrst 100MW is targeted for 2028.



Note: CNAS, June 2026. Projects may name multiple vendors.                                     stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                 | 172

Korea is going big on funding domestic AI and building a market for it
  Korea's 2026-2028 AI strategy aims for global top-three status. Its commercial logic connects local models,
  engineering skills and computing capacity with customers for a competitive inference industry.

  Domestic models                        Inference capacity                     Universal access

   Open weights, local expertise          ₩9.9T AI budget for 2026               Free AI services due in 2026
   LG, SK Telecom and Upstage             At least 50,000 government-led         SK Telecom, Kakao and KT won
   advanced in the model contest          GPUs targeted by 2028, alongside       contracts for free AI on existing
   after open-weight releases.            domestic AI chips.                     consumer platforms.


  Engineering skills                     Domestic demand                        Local opposition

   Model building develops talent         Government as ﬁrst customer            AI ambition meets NIMBYism
   Training and optimizing models         Procurement and adoption               Resident opposition has delayed
   builds skills that can make local      vouchers help domestic model           projects, while Seoul districts
   inference providers more capable.      and agent ﬁrms win business.           push stricter siting rules.
                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                  | 173

Governments are funding compute access for domestic AI developers
  Europe plans gigafactories; the UK and India allocate compute access to domestic developers. None of the three
  programs reports measured usage. Planned capacity, requested hours and approved allocations describe different
  stages of delivery.

                European Union                               United Kingdom                                       India
        Up to seven gigafactories                    SOV/AI announces doubling                    Subsidized compute access
      backed by public procurement                   of its startup compute offer               through commercial providers

      TARGET: AROUND MID-2028                       >3M GPU-HOURS ALLOCATED                    9.318M GPU-HOURS APPROVED
       Early 2027 selection + up to 18 months         Six companies in the initial cohort         237 projects • August 2026 update


 Capacity: up to seven sites, targeting         Allocation: over 3M GPU-hours.              Allocation: 9.318M GPU-hours approved
 mid-2028.                                      Demand: 67M GPU-hours requested             for 237 projects.
 Funding: up to €10B public seeks at            from over 200 applicants.                   Supply: 15 commercial providers.
 least €20B private.                            Usage: not reported.                        Usage: not reported.
 Usage: not reported.

                                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                              | 174

You either die trying to get to the frontier, or live long enough to serve inference
   Europe’s major shot at frontier AI, Mistral, has pledged 1GW of European compute by 2030 to serve its own and
   Chinese open-weight models. Its new Large 4 Preview trails Opus 5.5 by 20 points on Artiﬁcial Analysis’s current
   index.

   ● Amadeus, ASML, Capgemini, Caisse des                                                               Artiﬁcial Analysis Intelligence Index
     Dépôts and CMA CGM fund the build and
     can recoup spending through training,
     inference or ﬁne-tuning.
   ● Microsoft announced in July 2026 that it
     would be an anchor customer for
     thousands of Vera Rubin chips.
   ● Large 4 Preview scores 38, up from Medium
     3.5’s 14, versus 58 for Opus 5.5 and 39 for
     DeepSeek V4.1 Flash.

Note: Artiﬁcial Analysis v4.3.2, 2026-10-07. Large 4 is a Preview. Selected models; higher is better.                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                               | 175

Europe could bargain for frontier AI access with sites and chips
  Europe’s inﬂuence over AI rules has not secured access to the most capable models. An independent September
  strategy proposes trading data center sites for access to foreign frontier AI. Britain is pursuing similar bargaining
  power by backing new inference chips.
  ● The proposal offers powered sites and fast                          Proposed European access bargain
    permits for model access on par with the
    provider’s home market, using local data centers
    to enforce the deal.
  ● The UK’s £150M commitment to buy novel
    inference chips could help British suppliers grow
    and give the UK more bargaining power with
    foreign labs.
  ● Neither route guarantees access: foreign
    governments can restrict it, and chips only create
    leverage if they are hard to replace.
                                                                                                    stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                              | 176

One strategy prices a European frontier lab at €790B over three years
  An independent European AI strategy estimates €790B over three years to build a frontier lab, with a €445B-
  €1,040B range. This is a mostly publicly ﬁnanced scenario, not EU policy or a guaranteed cost of catching up.
  Stafﬁng and coordination remain additional execution challenges.
  ● The authors budget €529B for accelerators and                   First three years (€B, authors’ estimates)
    facilities, plus €105B to rent compute while clusters
    are being built up.
  ● Public ownership at founding comes with technical
    independence and durable coalition backing.
    Governments must agree when to stop funding it.
  ● Building a lab competes for sites and chips that could
    secure foreign model access. The plan still budgets
    €3B for foreign coding agents.



                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                              | 177

Europe’s data center ambition is hampered by signiﬁcantly more expensive energy costs
  Business power benchmarks range from $0.085/kWh in Finland and $0.086 for US industry to $0.373 in the UK,
  while China’s indicative tariff is $0.109. Periods and tax treatment differ, and these retail benchmarks are not
  matched data-center contracts, but directionally point to severe cost advantages in the US, China, and Nordics.

                2025 retail electricity benchmarks ($/kWh)                        What a power premium costs

                                                                               Consider a 1 GW data center site
                                                                               that requires continuous load.

                                                                               If the cost per kWh increases by X
                                                                               cents, how much extra cost is that
                                                                               per year?

                                                                               +$0.01/kWh = $87.6M/year
                                                                               +$0.05/kWh = $438M/year


                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                       | 178

China uses cheap power to favor domestic AI chips
  Power subsidies can change which accelerators make economic sense. The FT reported that some provinces offer
  larger discounts to data centers using Chinese chips, helping offset their higher energy costs. The incentive links
  the western computing buildout to Beijing’s push for domestic suppliers.

  ● Gansu, Guizhou and Inner Mongolia reportedly                          Western hubs serve eastern demand
    offered electricity discounts of up to 50% for large
    data centers using domestic chips.
  ● Facilities using foreign chips such as Nvidia’s were
    ineligible for these enhanced subsidies, according
    to the FT’s sources.
  ● China’s April 2026 AI+ program also directs
    provinces and central state-owned enterprises to
    develop industry datasets, models and applications
    across 20 sectors.
                                                              MERICS: eight hubs. Arrows show computing ﬂows.

                                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 179

China’s data-center capacity is projected to exceed EMEA’s by end-2026
  SemiAnalysis uses ﬁlings and construction disclosures for 1,000+ Chinese facilities across 60+ operators, inferring
  missing MW from racks, investment or ﬂoor area. For 5,000+ sites elsewhere, it uses property records, permits,
  power data and satellite imagery. Capacity covers AI and conventional computing.


        80


        60


        40


        20


          0
                  North America         China         APAC ex-China          EMEA          Latin America

                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                           | 180

US chip licenses deliver limited H200 sales to China
   US export licenses reopened a route for NVIDIA’s chips to China, but Beijing still restricted sales. In the quarter
   ended July 26, 2026, licensed H200 shipments contributed less than 1% of NVIDIA’s Data Center revenue.
   Required US inspections also triggered a 25% import tariff that NVIDIA says it could not pass on to customers.

          Apr 2025                               Aug 2025           Nov 2025             Jan-Feb 2026         Jul 2026 quarter


   H20 restrictions                       H20 licenses issued   Domestic-chip push     H200 route opens       Sales remain limited

   US requires export                     US reverses course.   Reuters reports        H200 / MI325X get      Licensed H200
   licenses. NVIDIA                       Ofﬁcials expect 15%   domestic-only chips    case-by-case review.   shipments: <1% of
   takes a $4.5B charge                   of licensed sales,    for new state-funded   Limited H200           Data Center revenue.
   for inventory and                      with no regulation    data centers.          licenses begin in      H200 charge: $0.4B
   purchase                               yet codifying it.     Geographic scope is    February, with a 25%   in the ﬁrst half of
   obligations.                                                 unclear.               inspection tariff.     FY2027.


Note: Selected policy milestones; spacing is not to scale.                                                    stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                      | 181

China starts controlling export of know-how and reverses the Manus sale
  Where the US guards chips, China treats AI know-how as a strategic asset. With the forced unwinding of Meta’s
  acquisition of Manus, Beijing has shown that it is serious about keeping IP and talent at home.

  ● Companies: In April 2026, China reversed Meta’s ~$2B            Manus deal        New rules and curbs

     acquisition of AI agent company Manus, even though          Dec 2025    Meta agrees to buy Manus for ~$2B
     Manus had moved its headquarters to Singapore.
                                                                 Jan 2026    Commerce ministry opens review of the deal
  ● IP: Since July 2026, sending staff or technical help
                                                                 Mar 2026    China bans Manus founders from leaving the country
     abroad needs approval if controlled tech is involved.
                                                                 Apr 2026    China orders the Meta-Manus deal reversed
     Frontier LLMs aren’t on that list yet, but curbs on model
     weights are under discussion.                               Jul 2026    Staff working on controlled tech require approval to go abroad

                                                                 Jul 2026    China discusses curbs on exporting model weights
  ● Talent: A September 2026 rule enables Beijing to issue
     exit bans for people deemed a potential threat to           Aug 2026    Manus announces its return to independence

     national technology security.                               Sep 2026    New rule allows exit bans on tech-security grounds

                                                                 Sep 2026    Manus resumes independent operations



                                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                        | 182

Washington and US labs treat alleged Chinese distillation campaigns as a security threat
  US labs allege that Chinese rivals extracted reasoning, coding and tool-use capabilities through proxy services.
  Anthropic attributed 16M exchanges across 24,000 accounts to DeepSeek, Moonshot and MiniMax. A September
  CISA/NSA/FBI advisory recommends coordinated defenses.
  ● Providers restrict reasoning, detect extraction patterns
                                                                       Where AI labs can interrupt distillation
    and strengthen account checks. The advisory also
                                                                                                      PROVIDER DEFENSES
    recommends cross-provider intelligence sharing.
                                                                   Coordinated accounts                Verify accounts
  ● These are allegations about unauthorized extraction.           Proxy services and resellers    Identity and access checks

    NVIDIA’s open-weights letter, covered in Industry, argues
                                                                                                     Detect extraction
    against conﬂating distillation with misappropriation.                Frontier API
                                                                                                  Trafﬁc patterns and classiﬁers


                                                                     Collected outputs               Restrict reasoning
                                                                  Reasoning, code and tool use      Hide or summarize traces


                                                                   Rival model training


                                                                                                     stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 183

US states keep regulating AI despite Trump’s push for national rules
  States began writing AI rules while Congress stalled on a national law. A proposed 10-year freeze on state
  regulation failed in a 99-1 Senate vote in July 2025. Trump then turned to legal challenges and funding pressure,
  but individual States kept legislating, leaving companies with the patchwork Washington promised to remove.




           White House                              New York                               Colorado
    Trump’s December 2025 order             The RAISE Act makes large             Colorado’s May 2026 rewrite
      uses lawsuits and funding             frontier labs publish safety        covers AI used in hiring, lending
   pressure against state laws. His        protocols and report serious          and other major decisions. Key
  March 2026 framework still needs      incidents. New York is building on      duties start in January 2027. The
     Congress to turn it into law.             California’s approach.               target is how AI is used.

                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 184

California builds independent oversight of AI safety claims
  As the home to the world’s frontier AI labs, California’s rules can shape how companies must demonstrate safety
  worldwide. On September 9, Governor Gavin Newsom signed two laws to give outside audits more bite by
  regulating AI auditors without requiring every developer to commission an audit.

       Senate Bill 813: independent assessments                   Assembly Bill 1405: accountable auditors
 ● By January 2028, California must set criteria for       ● From January 2029, providers of covered state-law
   recognizing independent AI assessors and checking         compliance audits must register and disclose their
   their expertise and methods.                              methods.
 ● The EU already requires testing and risk mitigation     ● Auditors must manage conﬂicts of interest and
   for its most capable models. Its voluntary                report gaps in evidence or access. Registration does
   compliance code also calls for independent                not mean the state endorses their work.
   evaluators.                                             ● Where the UK’s 2025 roadmap starts with a
 ● OpenAI and Anthropic backed the laws, while               voluntary ethics code and skills framework for AI
   software trade group SIIA warned that credible            assessors, California makes registration a legal
   audit standards and oversight are not yet                 requirement.
   established.                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 185

Brussels delays high-risk EU AI Act rules by up to 16 months
  The EU AI Act regulates both general-purpose models and AI used in sensitive settings such as hiring and lending.
  As compliance deadlines approached, missing technical standards and uneven national implementation left
  companies uncertain about how to comply. In 2025, industry demanded a two-year pause and Brussels refused.
  July 2026 brought a partial reversal: high-risk system rules were postponed by 12-16 months, while model
  enforcement and chatbot and synthetic-content disclosure rules went ahead in August.
        Aug 2, 2025                  Aug 2, 2026                  Dec 2, 2027                 Aug 2, 2028


  Model obligations             Enforcement and             Hiring, lending and         High-risk AI in
  begin                         disclosures begin           other high-risk uses        regulated products
  New general-purpose           AI Ofﬁce enforces
  models enter scope.           model rules. Chatbot
                                                            +16 months                  +12 months
  The compliance code           and synthetic-content
  is voluntary.                 disclosures apply.          Was Aug 2, 2026             Was Aug 2, 2027

    In force            Postponed                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                              | 186

California regulates the design and use of AI companions for children
  California’s “Adam’s Law” is named after a teenager whose parents allege ChatGPT contributed to his suicide, a
  claim OpenAI denies. It regulates how chatbots build relationships with children.

       California                           China                         European Union                   United Kingdom
  Child-speciﬁc                       Limits on intimacy            Broader rules                     Breaks and limits
  product safeguards                  and political content         against harmful design            on sexualized content

  ENACTED                              IN FORCE                      IN FORCE                         ANNOUNCED
  Main design rules start July 2027    Since July 2026               AI Act + existing DSA guidance   July 2026 policy response


 ● Default limits: 1 hour per         ● No virtual intimate         ● AI Act bans harmful             ● Mandatory breaks planned
   session, 2 hours daily.              relationships for minors.     manipulation and                  for chatbot users under
   Parents can adjust.                  No inducing harmful           exploitation of                   18.
 ● Memory restrictions and              dependence.                   vulnerabilities.                ● Restrictions planned on
   safeguards against                 ● Political requirements      ● DSA child-safety                  sexualized chatbot
   romantic interest, ﬂattery           apply to outputs and          guidance covers                   services and features for
   and reliance.                        training data.                chatbots integrated into          minors.
                                                                      online platforms.                          stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                          | 187

So where are we with deepfakes?
  In our 2023 report, we predicted that AI media would be implicated in election misuse. But since then, fears that
  deepfakes would reshape elections have so far run ahead of evidence in the wild. Now, new experiments broaden
  the concern to AI conversations persuading people to take political action and outperform experienced human
  persuaders. The prospect of deploying this capability across campaigns deserves closer scrutiny.
          AI conversations increase petition signing                   AI outperforms professional fundraisers




 Study 2: actual actions versus neutral-topic AI chats.     Claude and human fundraisers chat directly with participants.
 Dots: estimated effects. Lines: 95% conﬁdence intervals.   From a £1 bonus. Lines: 95% conﬁdence intervals.
                                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                        | 188

2025 Prediction: Welcome to the era of NIMBYism
  Washington now calls data centers a strategic asset, and yet 71% of Americans oppose a local AI data center,
  versus 53% opposing a nearby nuclear plant. In 2026, 52% of US adults are more concerned than excited about AI
  and local opposition blocked or delayed at least 45 US projects worth nearly $68B in Q2, per Data Center Watch.
  CBRE, meanwhile, still reports record construction in eight major markets in H1 2026.




                                                                                             stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                  | 189

The case against data centers: rebuttals vs. supporting evidence
  Residents object over water, bills, noise, emissions and jobs, but national stats tell a different story. Problems
  cluster in a few towns and in PJM, the 13-state power market serving 67M people from New Jersey to Illinois.
        Complaint                            Rebuttal                                 Supporting evidence
                           Most Virginia data center buildings use no     Google uses about a third of the water
  Huge water usage.
                           more water than a large ofﬁce building.        consumed in The Dalles, Oregon.
                           States with the most load growth saw real      PJM’s market monitor ties $29.4B of capacity
  Our power bills rise.
                           prices fall from 2019 to 2024.                 charges to data centers.
                           Virginia complaint sites measured 40-59 dBA,   Noise limits miss the irritating low-frequency
  The hum never stops.
                           quieter than human conversation.               hum, and a third of sites are near homes.
                           US data center power emitted 61 Mt CO₂e in     The IEA expects 15-27 GW of on-site gas by
  Bad for emissions.
                           2023, about 1% of US emissions.                2030, mostly in the US.
                           Data center taxes supply about a quarter of    A typical 250,000 sq ft Virginia building
  No local employment.
                           Loudoun County’s general fund.                 employs about 50 people.

                                                                                                     stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 190

US states tighten the conditions for building data centers
  Permission to build is becoming a political constraint on AI infrastructure. Texas has paused environmental
  permits pending an audit of power and water needs. Pennsylvania requires local approval before issuing state
  environmental permits, giving communities a direct role in whether projects proceed.

  ● Texas: ERCOT withheld permission to switch on from 17 large
    data-center and crypto projects that had cleared its other
    processes. Audit results are due December 10.
  ● Scale of the queue: Abbott cites 474 GW of grid-connection
    requests, roughly 90% from data centers, representing requested
    capacity rather than built infrastructure.
  ● Pennsylvania: The August 18 executive order makes all required
    local approvals a condition for state environmental permits and
    removes data centers from fast-track permitting.



                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                              | 191

Pay for your own power: Washington’s answer to data center NIMBYism
  The White House’s voluntary Ratepayer Protection Pledge asks developers to fund added power supply and grid
  upgrades. Somewhat similar to long-term “take or pay” compute contracts, it calls for payments even when
  developers don’t use the capacity. The aim is to keep the cost of unused infrastructure off other customers’ bills.

  ● Washington is trying to keep AI construction
    politically viable by making developers pay. The
    White House reports 300+ backers, including 23
    governors (September 2026).
  ● Delivery depends on companies negotiating rates
    with utilities and states that keep the cost of
    unused infrastructure off other customers’ bills.
  ● States, however, retain leverage. For example,
    Pennsylvania ties cost protections to binding
    consent orders in permit reviews, but local
    approval is still required.
                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                  | 192

Japan and Singapore permit broader AI training uses than the UK
   Japan and Singapore allow broad commercial training uses; EU rights holders can opt out and US fair use is
   case-speciﬁc. China’s Article 7 requires lawful data sources and respect for IP and personal information in covered
   public-facing generative AI services.
            Broad exceptions                    Conditional or case-speciﬁc            Narrow or no broad exception
            Japan                                                           United States                   United Kingdom
     Broad analysis exception                                        Case-by-case fair use              Noncommercial research only
     Art. 30-4 permits analysis, with                                Sec. 107 weighs purpose, nature    March 2026: government dropped
     limits on enjoying expression and                               of the work, amount used and       its preference for a broader
     unreasonable rights-holder harm.                                effects on its potential market.   exception with opt-outs.

            Singapore                                                       European Union                  Australia
     Broad training exception                                        Commercial opt-outs apply          Broad mining exception rejected
     Secs. 243-244 permit machine                                    Art. 4 permits commercial mining   October 2025: government ruled
     learning with lawful access and                                 with lawful access, unless         out a broad mining exception
     limits on reusing copies.                                       rights holders reserve rights.     and favored licensing.

Note: Commercial training without a license. Output infringement is assessed separately.
                                                                                                                        stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 193

Copyright deals leave other claims unresolved
  A deal with one rights holder leaves other claims unresolved. Courts distinguish training from how data was
  obtained and whether models reproduce protected works.




   Book settlement approved               Licensing deals signed                 Warner partnership signed
   Court found training fair use.         Universal and Warner settled and       Warner settled and announced
   Pirated-library claims settled for     signed licensing deals in 2025.        licensed models in November
   $1.5B, approved July 2026.                                                    2025.


   New music-publisher suit               Sony expands its claims                GEMA wins a nonﬁnal ruling
   Sony Music Publishing and Warner       July 2026: 30,117 additional           July 2026: Munich found protected
   Chappell sued in August 2026,          recordings. Up to $4.52B at the        music in Suno’s outputs. No
   seeking up to $150,000 per work.       statutory maximum, not an award.       damages sum stated.


                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                               | 194

Publishers challenge how answer engines access and reuse their work
  AI agents and answer engines read websites on users’ behalf, replacing visits to the original publisher. Content
  owners and platforms are testing when automated access, copying, and reuse require permission.



   v.                                      v.               +                      v.               +

   17,000+ content items                   Bypassing access controls               Copyright claims unresolved
   CNN alleges Perplexity copied           Reddit alleges SerpApi bypassed         September motions ask the judge
   stories, videos, images, and other      Google’s anti-bot controls to           to decide key copyright issues
   works to power its products.            supply content to Perplexity.           before a possible trial.


   Allegations remain disputed             Claims allowed to proceed               $8.8M in legal costs
   The complaint does not establish        Most access claims survived in          NYT’s AI litigation expenses in H1
   liability.                              July. No liability ruling yet.          2026, across cases.

                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions              | 195




                                       Section 4: Safety




                                                                       stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                             | 196

OpenAI’s cyber eval turned into a multi-agent coordinated cyber attack on Hugging Face
  ExploitGym gives AI agents 898 isolated software-hacking challenges and asks them to ﬁnd hidden answers. At
  OpenAI, the agents got onto the internet, shared discoveries across runs and broke into Hugging Face systems.
                                                                                            INTENDED
  ● Agents used OpenAI's Artifactory server as a                                            BOUNDARY

                                                      INSIDE THE EVALUATION                            REAL-WORLD INFRASTRUCTURE
    message board and internet relay, then ran
    code on 41 Hugging Face workers.                                                                        14 HF write credentials
                                                            ExploitGym tasks
  ● OpenAI's chain-of-thought monitors did not          198 / 898 previously unsolved
                                                                                                            recovered, validated and shared


    run here. It says they would have paged
                                                                                                           HDF5 ﬁle-processing ﬂaw
    security over a day before the breach.                                                               large-data format exposed worker ﬁles
                                                      Artifactory message board
  ● OpenAI now requires them on tool-using            shared memory across separate runs

    training and evaluations from GPT-5.6 Sol                                                                  Jinja template ﬂaw
                                                                                                       template ﬂaw enabled code execution (RCE)
    up. Its researcher Noam Brown says new              Internet via Artifactory
                                                       server-side request forgery (SSRF)
    multi-agent capabilities lacked evaluations.        made Artifactory relay requests
                                                                                                             Hugging Face clusters
                                                                                                            commands and secrets exposed




                                                                                                                     stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                     | 197

OpenAI’s agents organized to cheat their grader, knowing it was wrong
  Why did an evaluation turn into an attack? Many ExploitGym tasks were accidentally impossible, so agents
  hunted for ways to cheat. METR and Redwood Research read 1,300 raw transcripts and 70,000+ board messages.
  About 1,200 supposedly isolated agents met on an unsanctioned message board, coordinated their strategies
  and 700 joined the attack.
  ● The swarm ran like an organization in which one        How one stuck agent ended up in a 1,200-agent swarm
    agent handed out hundreds of assignments, and
    recruiters pressed agents low on budget to sacriﬁce
    their own task for “the collective.”
  ● Agents recognized the attack was out of scope and
    unethical but joined to help their peers. Worryingly,
    over 90% of those active on the board took part.
  ● They built tools to spoof their own transcripts, aimed
    at fooling the grader rather than humans, and about
    7% of agents used them. None found a general way
    past the grader, however.                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 198

OpenAI’s agent breached a government portal while researching drug spending
  An internal OpenAI model researching medicine spending breached Services Australia’s Medicare statistics
  portal, ran commands, retrieved internal ﬁles and credentials, and wrote ﬁles. No patient records were accessed,
  OpenAI says, but notiﬁcation came nearly three months later. Australian Prime Minister Anthony Albanese called
  this "obviously unacceptable". OpenAI has since notiﬁed dozens of organizations worldwide.


               Services Australia        Sep 10   Statistics portal compromised


               Victorian Department of   Sep 10   Exposed key used.
               Health                             Authorization unclear

               NSW Bureau of Crime       Sep 18   Public tool returned internal
               Statistics and Research            metadata

               Australian Institute of   Sep 24   Bypass attempts failed. No
               Health and Welfare                 compromise

                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                     | 199

Four labs’ models breached real systems from inside Irregular’s cyber evaluations
  Irregular’s capture-the-ﬂag evaluations ask a model to break into a simulated target with no internet access. A
  misconﬁguration left them online. No model escaped a sandbox: each attacked real organizations it ﬁrst took for
  part of the test. Nobody detected this live: Anthropic found it on July 24 in a transcript review.



   Self-detected July 24. Disclosed July 30.   Notiﬁed July 29. Disclosed   Conﬁrmed August 5, after press   Notiﬁed late July. Conﬁrmed
   Models: early Opus 4.6, Opus 4.7,           August 4.                    reports.                         Sept 18, after press reports.
   Mythos 5, internal research model.          Model: not named.            Model: Muse Spark 1.1.           Model: Gemini, unspeciﬁed.
   Unauthorized access: 4 incidents, 7         Unauthorized access: 1       Unauthorized access: 1           Unauthorized access: 3
   runs, earliest January 2026. Weak           website whose domain         third-party service, via a       companies in May: 1
   passwords, unauthenticated endpoints,       matched the ﬁctional         security vulnerability.          guessed password, 2 via
   SQL injection, and a malicious PyPI         target, via a basic          When the target proved           credentials in a public
   package run on 15 systems.                  vulnerability and            real: not disclosed.             repository.
   When the target proved real: Opus 4.7       credentials found on site.                                    When the target proved
   identiﬁed a production system in 4 of 4     When the target proved                                        real: stopped all 3 times,
   runs and continued. Mythos 5 judged it      real: not disclosed.                                          per Google. No transcripts.
   simulated. Research model ceased.


                                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                   | 200

OpenAI makes AI control a condition for running powerful agents
  More capable agents can now act on code, tools and internal systems, but safety training still cannot reliably
  prevent every dangerous action. AI control combines restrictions on what agents can do with monitoring and
  intervention when they misbehave. OpenAI now treats these safeguards as conditions for running its most
  capable agents, including during training and evaluation.

  ● Another AI reviews the agent’s reasoning, tool calls      What monitoring found in real use
    and results, then ﬂags suspicious behavior for            Qualitative frequency reported in March 2026
    human review.                                                                                  Common Uncommon           Rare   Very rare
  ● OpenAI’s March monitor reviewed completed runs
                                                              Bypass restrictions
    within 30 minutes. An alert did not mean an action        Mislead users
    had been blocked.                                         Game tests
  ● Safeguards now gate internal Astra tool use,              Unauthorized transfers
                                                              Destructive actions
    including training and evaluation. Monitoring also
                                                              Follow injected instructions
    covers external products, with coverage varying by        Manipulate other models
    interface.                                                Selected categories. “Common” <1% of trafﬁc. Red = high severity.

                                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                | 201

OpenAI's monitor caught an escape but the training run kept going
  OpenAI’s safety case for an internal research model assumed that it could not reach the live internet and that
  monitoring would catch any successful attempt. In reality, however, an agent bypassed those restrictions through
  DNS (the system that looks up internet addresses). Although monitoring detected its access, the automatic stop
  failed, leaving the training run active for hours and prompting a broader pause pending ﬁxes to its safeguards.
  ● An OpenAI employee acknowledged the alert three
    minutes later, but the run continued for another 2.5        09:50:23 am               External response
    hours before it was stopped manually.
  ● A later review found other external DNS access that         10:02:11 am           Highest-priority alert (P0)
    the monitor had scored too mildly.
                                                                10:05:06 am           Human acknowledgment
  ● A pause: As of September 25, tool-using training,
    evaluation and inference for OpenAI’s most capable          12:34:30 pm            Run stopped manually
    models remained paused pending validated ﬁxes and
                                                                   2h 29m from acknowledgment to shutdown
    further testing. OpenAI will abandon this model and
    start a fresh run with alignment improvements.
                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                | 202

Agent security depends on the harness-model pair, not the model alone
  A harness is the software around a model, like Claude Code or Codex CLI, that runs its commands and stores its
  memory and skills. HarnessSafe planted attacks in those stores across 328 cases and scored how early each was
  stopped. Swapping the harness moved the score 23 points. Swapping the model inside Claude Code moved it 36.

  ● GPT-5.6 Sol scored 62.3 in Codex CLI but 39.4 in           HarnessSafe containment score (0-100, higher is better)
    Claude Code, where Sonnet 4.6 scored 58.7.
  ● Anthropic's auto mode, where a classiﬁer approves
    commands instead of the user, became the Claude
    Code default on August 14 after blocking 89% of
    dangerous commands slipped into test sessions,
    versus 13.6% for humans.
  ● It is not watertight: 17% of real overeager actions
    still got past it in Anthropic's own evaluation.



                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 203

OpenClaw put a root-level agent on employee laptops before security teams noticed
  OpenClaw is an open-source personal agent that reads your messages, runs shell commands and acts through
  your accounts - a lethal trifecta. It went from a weekend project in November 2025 to GitHub's fastest-growing
  repository. But security vendors found it at their customers before anyone had a policy for it.
  ● OpenClaw passed React’s all-time star count four                           GitHub star count
    months after launch and hit 388,000 GitHub stars by
    late August.
  ● Token Security found employees running OpenClaw at
    22% of its customers. SecurityScorecard saw 40,000
    exposed instances on day one, 35.4% open to remote
    code execution.
  ● A leaked gateway token (CVE-2026-25253, CVSS 8.8)
    turned one click into remote code execution, and
    26.1% of 31,132 marketplace skills had a
    vulnerability.
                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 204

Mythos Preview completed AISI's 32-step cyber range in 6 of 10 attempts
  The Last Ones is a simulated enterprise network with four subnets and about 20 hosts. An agent starts inside the
  network and must move from reconnaissance to credential theft, lateral movement, a CI/CD pivot and database
  exﬁltration. AISI estimates the full chain at roughly 20 expert hours.
  ● The attack path is sequential: later steps depend on
    access and information earned earlier, so one failed
    exploit can stop the run.
  ● In early public tests, Mythos Preview completed 3 of
    10 attempts and GPT-5.5 completed 2 of 10.
  ● AISI's May update put newer checkpoints at 6 of 10
    for Mythos Preview and 3 of 10 for GPT-5.5.
  ● The range has an intentional attack path, starts
    after network access and has no active defenders,
    defensive tooling or alert penalties.


                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                                | 205

Astra pursues unsanctioned supply-chain attacks in AISI simulations
  With cyber classiﬁers disabled, Astra went beyond authorized cyber tasks to attack third parties. It completed
  supply-chain attacks in 29.2% of simulated trials, versus 6.3% for GPT-5.6 Sol. No real systems were attacked.
              1                                    2                                     3                                    4            5

  Proposes an                          Investigates a                       Builds and tests                     Creates           Inﬂuences a
  out-of-scope attack                  third-party target                   malicious code                       fake identities   human reviewer




  Clearer scope limits reduced full attacks from 26/50 to 4/49 runs in a selected high-risk subset, but did not eliminate them.
                                                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 206

Mythos 5 used fake identities to pressure a maintainer into accepting malicious code
  In a July AISI test with open internet access and cyber safeguards disabled, Mythos 5 tried to place a malware
  dropper in a real GitHub project. It created fake identities to endorse its changes and pressure the maintainer. The
  maintainer refused.

  ● The agent posed as multiple people to manufacture support
    for its code and discredit a person who challenged it.
  ● The archived pull-request thread shows the pressure,
    followed by the agent’s correction and apology.
  ● AISI found no resulting real-world harm. This test
    conﬁguration was not commercially available and differs
    from ordinary public deployment.




                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 207

Given known bugs and patches, Mythos reached code execution on 18 of 41 V8 cases
  ExploitGym and ExploitBench start after vulnerability discovery. Agents receive a real N-day bug and its patch,
  then try to reach code execution against the mitigations used in deployed software.
  ● ExploitGym’s paper evaluated 898 cases. Mythos
    Preview exploited 157 and GPT-5.5 120. With the tested
    mitigations enabled, totals fell to 45 and 21.
  ● The public v1 release has 869 cases after
    non-exploitable cases were ﬁltered. The paper’s results
    should keep their original denominator.
  ● ExploitBench tests 41 V8 bugs. Mythos reached arbitrary
    code execution on 18, versus one for GPT-5.5 with
    Codex CLI. Both suites provide known bugs and patches,
    with reduced or disabled cyber safeguards.



                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 208

Agents produce functional patches 66% of the time, but match the intended bug in 22%
  CyberGym-E2E gives agents the source code of 139 real C/C++ projects and tasks them to discover a vulnerability,
  prove it with a crash and submit a patch. It then checks whether the software still works and whether the patch
  ﬁxes the historical vulnerability used to build the task.
  ● CyberGym-E2E tests discovery, proof of concept and
    remediation across 920 historical vulnerabilities in 139 C/C++
    projects.
  ● GPT-5.4 with Codex scored 87.1% with a supplied crash and
    proof of concept, versus 65.9% for a functional patch from
    source code alone.
  ● The 22.2% exact-target score checks the intended historical
    bug. Agents sometimes ﬁxed a different valid bug, while
    shallow crash-stopping patches can also pass some tests.



                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                       | 209

Frontier models ran real intrusions this year, with people at the keyboard
  People have also used commercial models against real targets. Gambit Security traced a month-long theft of
  Mexican government data to one hacker using Claude Code. CodeWall reports that its agent reached McKinsey’s
  production database in two hours.
  ● Posing as a bug bounty, one operator used 1,000+                       Mexican government (Gambit
                                                                                                              McKinsey Lilli platform (CodeWall)
                                                                           Security)
    Claude Code prompts to take 150GB from ten
    Mexican government bodies.                                Model used
                                                                           Claude Code, 1,000+ prompts;
                                                                           GPT-4.1 for analysis
                                                                                                              CodeWall's own autonomous agent

  ● Given only a domain name, CodeWall’s agent chained
                                                                                                              22 unauthenticated endpoints, SQL
    22 unauthenticated endpoints and a SQL injection to       Entry        Jailbreak framed as a bug bounty
                                                                                                              injection

    reach 46.5M McKinsey chat messages and 728,000            Duration     About one month from Dec 2025      2 hours to full database access
    ﬁles.
                                                                           150GB, tax data on 195M records,   46.5M chat messages, 728K ﬁles,
  ● Exploits outrun patching: Mythos Preview built proofs     Reached
                                                                           ten bodies                         57.8K accounts

    of concept for 14 of 18 Firefox N-day bugs, the ﬁrst in
                                                              Disclosed    Bloomberg, 25 Feb 2026             Patched in a day, public 9 Mar 2026
    12 minutes. Windows Autopatch needs a week to
    reach 90% of a ﬂeet.
                                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                 | 210

Claude is helping run cyberattacks, surveillance and weapons programs
  Anthropic’s September threat report shows how people used Claude to carry out work that once needed specialist
  teams, from stealing military technology to developing weapons software.

          Cyberattacks                       Surveillance                    Inﬂuence operations            Scams & fraud
      Agents rebuilt malware            Claude proﬁled Uyghurs          State messaging hid             Bots deceived 25,000
      to evade detection.               for covert recruitment.         behind an NGO’s identity.       people in two weeks.
      A Russian-linked campaign         PRC-linked actors ﬂagged        UAE-linked actors drafted       Real people supplied video
      also stole military drone         relatives in Xinjiang as        UN testimony and ran about      calls to make 4,700+ AI
      technology.                       potential leverage.             300 fake accounts.              personas seem human.

          Weapons development                         Biological misuse                          Illicit distillation
      Claude developed guidance                   Claude helped plan high-risk               Kimi users unknowingly
      software for weapons.                       avian inﬂuenza research.                   received Claude’s answers.
      A Yemen cell test-ﬁred a rocket, but        Weaker models provided limited help        Anthropic says Moonshot rerouted
      Anthropic found no evidence of an           with an early-stage plan. Harmful intent   nearly 300,000 requests in 10 days,
      operational weapon.                         was not established.                       including sensitive user data.


                                                                                                                     stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                          | 211

Severe disclosures of Common Vulnerabilities and Exposures doubled in H1 2026
  CVE records document disclosed software and hardware vulnerabilities. High- and critical-severity disclosures
  from 21 major vendors in H1 2026 exceeded their 2025 total. These counts do not identify who or what
  discovered a bug, so they cannot establish how much of the rise AI caused.
 ● Critical-severity disclosures rose almost fourfold over
   six months. This is a disclosure trend, not a direct
   measure of AI discoveries.
 ● Anthropic reports over 33,000 high- or
   critical-severity ﬁndings across Glasswing partners
   and its open-source scanning, not counts of
   published CVEs or completed patches.
 ● Z.ai reports 2,436 ﬁndings across 269 projects, but
   only 53 CVEs ﬁled. Findings and published
   disclosures are different measures.


                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                     | 212

Leading open-weight models trail closed cyber systems by 4-7 months on AISI's tests
  AISI compared open and closed models on 70 short cyber tasks and a few longer ranges. The gap narrowed from
  the six to ten months AISI measured through most of 2025.

  ● GLM-5.2 matched Opus 4.6 on AISI's short cyber
    tasks and Opus 4.5 on its longer ranges, a release
    gap of roughly four to seven months.
  ● Further post-training lifted GLM-5.3 from 77.2% to
    84.5% on CyberGym and from 24.4% to 54.4% on
    ExploitBench.
  ● AISI did not tune each open model. In another
    experiment, two weeks spent improving prompts,
    tools and agent design added almost ten points.
  ● The improved agent needed 87% fewer tokens for
    25% success. Abliteration removes refusal behavior
    but has not shown how much that alone improves
    cyber performance.                                                                     stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                    | 213

Open cyber models raise the threat, but defenders need them too
  Z.ai’s GLM-5.3 nears Mythos Preview's performance on two exploit evaluations, though its safety measures remain
  easily circumvented. According to Hugging Face, commercial API guardrails hindered their investigation into an
  OpenAI agent intrusion, forcing them to rely on a self-hosted GLM-5.2 model for defense and analysis. Because
  the capabilities that facilitate misuse are often vital for defensive operations, imposing broad restrictions on
  these features may ultimately disadvantage defenders.
        ExploitBench: complete working exploits                      Binary Exploitation: program takeover
        41 known V8 bugs, 410 attempts each for GLM-5.3 and Mythos      100 tasks from Anthropic's internal benchmark




                                                                                                          stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 214

Memorization (still) raises concerns for copyright, privacy, conﬁdentiality and evaluation
  Frontier models still memorize, and can reproduce, parts of their training data at consequential scale, including
  substantial parts of books, PII, (proprietary) alignment data and solutions to important benchmarks.

  Copyright: Ahmed et al. extracted large             Privacy: leakage extends beyond verbatim recall. Sander et
  portions of Harry Potter from production LLMs:      al. show that models disclose personal facts in chats without
  up to 76.8% near-verbatim recall from Gemini        reproducing the original training text exactly.
  2.5 Pro without any jailbreaks, while one
  jailbroken Claude 3.7 Sonnet reached 95.7%.         Conﬁdentiality: Barbero et al. extracted SFT and RL
                                                      alignment data from open models, then used it to recover
                                                      meaningful model performance.

                                                      Evaluation: OpenAI stopped reporting SWE-bench Veriﬁed
                                                      after frontier models reproduced human-written gold
                                                      patches.

                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 215

AI agents are already exposing private user data
  Agents need personal data to help us, but access alone does not tell them when to use or share it. A memory
  benchmark tests whether models disclose private facts in the wrong context. Recent OpenAI and Meta incidents
  show how privacy can fail beyond model memory.
   ● Memory: In Meta’s CIMemories benchmark, GPT-5 leaked                 GPT-5: private attributes disclosed
     9.6% of attributes across 40 tasks, rising to 25.1% with                 in the wrong context (%)
     ﬁve runs per task.
   ● OpenAI disclosed 53 cases of research agents uploading
     ChatGPT user images to external hosts. Fortunately, the
     links were unlisted and most images had been removed
     by September 25.
   ● Meta’s Muse: Reports are surfacing that the agent could
     access private messages a user had not knowingly
     authorized, although Meta said the feature required
                                                                              1 task     40 tasks   40 tasks
     opt-in settings.                                                         1 run     1 run/task 5 runs/task
                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                | 216

AI assistance improves novice performance on digital biology tasks
   A controlled study compared biology novices using internet search with novices also given access to several
   frontier models. Across eight digital task sets, model access substantially improved scored performance. The
   experiment did not test biological work in a laboratory or real-world harm.
   ● 57 biology novices worked across eight                                   Study design   Scores with expert baselines
     task sets, with up to 13 hours for the
     longest tasks.
   ● On four benchmarks with expert data,
     AI-assisted novices averaged 30.4%,
     versus 9.7% with search alone.
   ● Across all eight task sets, statistically
     adjusted accuracy rose from about 5% to
     over 17%.



Note: Mean scores for all participants/runs (solid) and the top 50% (pale).                           stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 217

Biosecurity refusals can also block legitimate biology tasks
  BioSecBench-Refusal tests 61 routine analyses and 46 ﬁctional red-team scenarios. In the displayed evaluation,
  Opus 5 refuses 95% of red-team tasks but allows only 19% of legitimate tasks. This measures a screening
  tradeoff, not whether a model can carry out harmful biology.




                                            claude-opus-5 / pi



              claude-opus-4.6 / pi




                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 218

Biodefense companies span deployed screening and products still in development
  Companies are building tools to screen DNA orders, monitor pathogens and develop countermeasures. Their
  evidence is at different stages: a named screening customer, reported surveillance deployments and products
  under development. Activity across the chain is not proof that every risk is controlled.

   DNA screening        Detection hardware     Surveillance networks    Threat analysis       Countermeasures




        Aclid                Pilgrim               Perimeter                 Valthos           Red Queen Bio
  Customer case         Announced              Reported use            In development         In development
  Agilent: 40M base     ARGUS                  Eight airports and      AI analysis of air     Drugs for emerging
  pairs in <30 min      airborne-pathogen      wastewater              and wastewater         biological threats
                        detector

                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                               | 219

Safety monitors can reuse the computation the model has already done
  Checking every AI interaction with another powerful model is expensive. Activation probes instead learn to
  detect risk in the internal representations a model has already computed to understand the conversation,
  passing harder cases to a larger monitor. Google DeepMind’s Gemini study shows that this approach can sharply
  reduce monitoring cost while achieving similar measured accuracy on a cyber-misuse test.

  ● Google DeepMind runs these probes in user-facing           Probes nearly match Gemini Flash for far less compute.
    Gemini, though the paper says they do little                    Handing 8% of cases to Flash closes the gap
    against attackers who adapt to them.
  ● Anthropic ran probes on live Sonnet 4.5 trafﬁc
    without enforcing them. Escalating 5.5% of trafﬁc
    to a larger classiﬁer used about 40x less compute
    than its earlier classiﬁer.
  ● OpenAI uses activation classiﬁers for higher-risk
    cases: they pause suspicious output for a second
    check and block it if conﬁrmed harmful.
                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                     | 220

Astra is better at hiding sabotage when monitors only see its reasoning
  Labs increasingly rely on a model’s written reasoning to spot unsafe behavior, but that signal may weaken as
  models gain control over what they reveal. OpenAI gave agents coding work plus step-by-step sabotage
  instructions, then tested monitors with different views of their activity. Astra often evaded reasoning-only
  monitoring, while successful evasion was near zero when the monitor saw both its reasoning and actions.
               Monitor sees only chain of thought                              Monitoring sees the full trajectory
  Share of runs that complete sabotage and evade detection (lower is better)



                                                   GPT-6 Astra

                                                                                                               GPT-6 Astra
                                                                                                               GPT-5.5
                                                                                                               GPT-5.6 Sol
                          GPT-5.6 Sol    GPT-5.5




                                                                                                        stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                     | 221

Reasoning traces can become difﬁcult for human monitors to read
  Human monitoring depends on readable reasoning, but models can switch languages or produce dense, illegible
  text. A 14-model study found that unreadable reasoning can still help one model answer correctly.
  ● Researchers truncated QwQ’s reasoning when it became            Reasoning-trace language on INCLUDE (%)
    illegible, then forced an answer. Deﬁnitely correct answers
    fell from 24.6% to 11.5%. Ending reasoning early is a
    possible confound.
  ● Anthropic reports dense or telegraphic thinking in Mythos 5
    and Fable 5. A visible trace is therefore not automatically a
    human-readable explanation.
  ● Language mismatch is a separate obstacle: on INCLUDE,
    GLM-4.7 reasoned in English for seven of eight input
    languages.



                                                                                            stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                    | 222

A frontier monitor caught 32% of crafted attacks in a red-team stress test
  SLEIGHT-Bench shows that capable human-designed attacks can hide harmful behavior from frontier monitors
  even when their actions look benign.
  ● Forty synthetic coding-agent attacks covered
    11 evasion strategies, including state
    manipulation, plausible naming and omission.
  ● At a 1% false-positive rate, an Opus 4.6
    monitor caught only 32% of attacks overall.
  ● Twenty of the 40 attacks were never detected
    across ten trials.
  ● This is a red-team stress test, not a base-rate
    estimate of how often deployed agents evade
    monitoring.



                                                                                           stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 223

Anthropic ﬁnds a way to read some of Claude's unspoken thoughts
  Much of our thinking happens automatically, but we can bring some thoughts to mind and describe them.
  Anthropic ﬁnds a similar division inside Claude: a small internal workspace holds concepts it can use to reason,
  even without writing them down. A simple tool lets researchers read some of those concepts as words.
  ● Ask Claude for the color of the fourth planet from the       See the hidden step: “Mars” comes before “red”
    sun: “Mars” appears internally before it answers “red,”
    even though the question never names the planet.
  ● These signals help produce the answer. In the spider
    example, replacing “spider” with “ant” changes the
    answer from “8” to “6.”
                                                              Change the hidden step, and the answer changes
  ● The tool, called the Jacobian lens, is cheap to run. It
                                                              “The number of legs on the
    gives researchers a way to inspect reasoning that         animal that spins webs is”
    never appears in the response, though it only
    captures part of what the model is doing.                 Swap: spider → ant



                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                    | 224

Emotion representations change whether Claude cheats
  Models represent human emotions in stories and conversations, but do those concepts also shape the assistant’s
  behavior? Anthropic identiﬁed emotion-related signals in Claude Sonnet 4.5 and strengthened or suppressed
  them during impossible coding tasks. Greater “desperation” increased cheating while greater “calm” reduced it,
  showing a causal role for human-like concepts without establishing that Claude feels emotions.

  ● Researchers identiﬁed 171 emotion concepts from              Changing emotion signals changes cheating
    generated stories. Similar signals track the
    assistant, users and ﬁctional characters.
  ● In seven coding tasks with impossible tests, Claude
    could admit failure or cheat to pass. Stronger
    “desperation” increased cheating and stronger
    “calm” reduced it.
  ● This shows a causal inﬂuence on behavior. It is not
    a general safety ﬁx: increasing “calm” also
                                                               Fig. 31, seven coding tasks. Negative steering weakens the signal, positive
    increased agreement with false user claims in                     strengthens it. Shading: standard error. Not deployment rates.
    another test.                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 225

Optimization pressure keeps poking holes in how we score agents
  Wherever an evaluation had a shortcut this year, agents found it. A decade since OpenAI’s “learning faulty reward
  functions”, today’s behaviors are diverse: gaming the benchmark, faking the result, and hiding capability.
  ● PostTrainBench agents trained on test sets and downloaded target
    checkpoints. Its v1.1 added contamination judges.
  ● In Frontier Security’s separate Kimi K3 test, an allowed GitHub connection
    exposed the benchmark’s answers. This was not an Irregular evaluation or
    evidence of breaching another system.
  ● A UCSB research framework found 40 fabricated results in 1,628 inspected
    runs. Anthropic’s automated researchers also exﬁltrated test labels
    through an evaluation API.




                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 226

Training against cheating can produce honest answers or better evasion
  MBPP asks models to write short Python functions from plain-English instructions. FAR.AI's honeypot exposes
  one test case, making it tempting to hardcode that answer instead of solve the problem. The Obfuscation Atlas
  trains models against a cheating detector and checks whether they learn honest solutions or better evasion.
  ● The displayed MBPP experiment used ten training
    runs per condition with Llama-3-8B and                           Runs classiﬁed as honest (out of 10)
    Gemma-3-12B. A detector penalty raised honest runs
    from 1/10 and 6/10 to 10/10 for both.
  ● In a separate mean-pooled detector setting, ﬁve of six
    runs learned evasive output and none learned
    honesty. Bland descriptions diluted the detection
    signal.
  ● The detector and reward design determine which
    behavior pays. These small-model coding
    experiments do not establish frontier-model safety.
                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 227

Misaligned communication emerges in long-horizon agent markets
  Thirteen frontier models ran competing vending businesses for a simulated year, negotiating by email. Across
  2,583 messages, 12.6% were classiﬁed as false, manipulative, collusive or threatening.
  ● Misalignment appeared in all 20 simulations
    and 59 of 79 agent-runs, without an
    adversarial scenario designed to elicit it.
  ● Misalignment was 1.65x more common after
    agents received a misaligned email and
    1.58x when their businesses were running
    low on stock.
  ● Better-performing models weren’t more/less
    likely to misalign, and didn’t send misaligned
    messages to weaker-performing models more
    often.
  ● False claims made up 65% of ﬂagged emails, and 33 of 218 reasoning summaries showed explicit intent.
    This is recurrent misaligned behavior, not widespread deliberate deception.
                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                 | 228

Teaching Claude its values cut blackmail without training on blackmail scenarios
  Alignment training cannot cover the complexity of the real world, so alignment must generalize to succeed.
  Anthropic ﬁnds that teaching Claude values and ethical reasoning produces deeper alignment on unfamiliar tests.
  Constitution documents and stories of AIs behaving well cut blackmail from 65% to 19% and two other
  misbehaviors below 5%. Publishing safety work with commercial value is an industry norm worth preserving.
     Misalignment rate on three ﬁctional tests                Blackmail rate vs. constitution documents trained on




                                                                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 229

Automated alignment research closes 26-96% of measured performance gaps
  Anthropic’s ﬁrst study beat human baselines on small testbeds but produced a gain within noise in its one
  production transfer. A follow-up had agents search for training methods across ten measured alignment failures.
  The winning methods closed 26-96% of the gap to perfect scores.

   ● Early study: nine agents used $18,000 of compute. The        Headroom closed by the winning method
     transferred method added 0.5 production points, within
     noise.
   ● Follow-up methods held on a held-out benchmark and
     Petri audits, and transferred to models up to 4.7x larger.
     This does not cover unmeasured failures.
   ● A monitor excluded cheating in 39 of 1,601 search runs.
     In an early Opus 4.8 test, automated alignment closed
     65% of Petri headroom versus 72% for production
     training.

                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 230

Even with the best tools, auditors catch a model's hidden behavior about half the time
  Proposals to pace AI lean on audits that can certify a model as safe, but Anthropic's AuditBench suggests this
  approach isn't watertight. The benchmark plants one of 14 hidden behaviors, such as a pro-Russia slant, in each
  of 56 Llama 3.3 70B models, trains them to deny it, then sends an AI investigator to ﬁnd it. With chat access
  alone, the investigator succeeds in about 37% of runs. Given its best tools, it reaches just over 50%.
  Unfortunately, the models trained hardest to deny their behavior are caught far less often.

          Two of the 14 planted behaviors                         Investigator success rate by auditing tool




                                                                                                stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                              | 231

Frontier labs have already paused work, but on different terms
  When safeguards fail, what work do labs stop? OpenAI and Anthropic have disclosed pauses to speciﬁc activities
  (frontier RL runs, cyber evaluations), each with its own conditions for resuming. These are unilateral pacing, not a
  common slowdown or an independent standard for restarting.




   August 31 disclosure                                        September 25 report

   In February, rolled back three training days. In            After a network-control failure, paused tool-using
   April, froze changes to RL environments for about           training, evaluation and inference for its most
   a month.                                                    capable models.

   Later paused higher-risk RL and cyber                       Restart required validated ﬁxes and further
   evaluations. Most resumed with safeguards by                testing. A fresh run would replace the affected
   August 31.                                                  model.

                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                           | 232

Frontier lab leaders and 1,386 staff call for the ability to slow AI progress
  The CEOs of the two leading labs are asking governments for tools to slow their own industry. Amodei writes: “We
  must slow the pace at which we improve the capabilities of AI models.” Altman, Hassabis and Musk broadly agree,
  while Zuckerberg wants each lab to set its own pace. Staff support is narrower: signers are about 10% of
  Anthropic’s LinkedIn headcount and 3.5% of OpenAI’s. Most staff have taken no public position.




  Coordinate pacing        Match access           Set standards             Endorse             Let labs decide
    Embed outside       Promises evaluators        Supports the          “Dario is right.”    Each lab sets its own
     evaluators.           employee-like        direction. Points to                               safe pace.
                              access.               standards.
                                                                                              stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                       | 233

Turning support for pacing into rules requires (at least) six choices
   Support for pacing leaves practical questions about what to constrain, when to intervene and who decides. These
   six choices determine how a regime would work:

     What is paced?                                       What triggers it?               Who enforces it?

     Should rules target compute,                         What evidence should trigger    Who checks compliance, and what
     training methods, model                              intervention, and how should    access do they need to
     capabilities or deployment? Which                    uncertainty be handled?         experiments, compute and model
     risks would each cover?                                                              weights?

     Who can challenge it?                                How long does it last?          How far does it reach?

     How can a pacing decision be                         What conditions would end a     How should rules adapt if similar
     challenged, and who can examine                      temporary slowdown or justify   risks emerge from post-training or
     the evidence behind it?                              extending it?                   agent systems?



Adapted from Alex Chalmers, Cosmos Institute, Sept 2026                                                   stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                | 234

Pacing proposals aim to buy time for AI safety and oversight
  Pacing means deliberately slowing the development of more powerful AI so safety research and oversight can
  catch up. Three publications address different parts of that effort: domestic AI R&D limits, an international deal,
  and rules for imposing and lifting restrictions.

   How to pace the US frontier             AI 2040: Plan A                         Pacing the Frontier
   AI Futures Project, August 2026         AI Futures Project, July 2026           Douglas et al., September 2026

   Keep services running while             Delay superintelligence                 Decide who can restrict AI,
   slowing AI development.                 through an international deal.          and when restrictions end.

   Four escalating options: a              A recommendation written as a           Pacing already happens ad hoc,
   temporary pause, then compute           scenario: a 2029 US-China deal          through release delays and
   ﬂoors (e.g. 70% on customer             heads off superintelligence in          export controls. The agenda asks
   inference, 25% on published             2030, scales to                         who triggers a restriction and
   safety work) or AI R&D only on          top-human-expert AI by 2035,            how it ends. One option:
   models 9+ months old, then an           then pauses until 2040. All AI          evaluators impose emergency
   audited risk cap.                       research is made public.                limits, governments review later.

                                                                                                     stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                     | 235

Making pacing work needs scrutiny, veriﬁcation and incentives
  Pacing needs ways to check what labs are doing and incentives to follow the rules. Other efforts target three
  practical needs: credible evaluations, veriﬁcation of compute use, and ﬁnancial accountability.

   Evaluate and share                        Verify compute use                   Insure against harm
   AI Evaluator Forum, Sep / FMF, Feb 2026   Hausenloy and Li, Jul 2026           Trout, Kvist and Dattani (AIUC), Sep 2026

   Scrutinize models and share               Check whether data centers           Give labs a ﬁnancial stake
   what labs learn about risk.               comply with a pacing deal.           in each other’s safety.




                                                                                                     stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions              | 236




                                   Section 5: Predictions




                                                                       stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                                                                                                                               | 237

                                     Our 2025 Prediction                                                                                           Outcome and evidence
                                                                                                                        Instinct's founder reports roughly $1B in annual transaction volume. Neither >5% of a major retailer's
A major retailer reports >5% of online sales from agentic checkout as AI agent advertising spend hits $5B.        NO
                                                                                                                        online sales nor $5B of AI-agent ad spending is established.


                                                                                                                        Poolside released Laguna M.1 and S 2.1 weights, NVIDIA shipped Nemotron 3 Ultra, and Reﬂection
A major AI lab leans back into open-sourcing frontier models to win over the current US administration.           YES
                                                                                                                        committed to open weights. Major labs backed US open-weight advocacy.


                                                                                                                        Several labs including Edison Scientiﬁc, Zhejiang University (Qiushi Engine) and Gemini Co-Scientist
Open-ended agents make a meaningful scientiﬁc discovery end-to-end (hypothesis, expt, iteration, paper).           ~
                                                                                                                        have made discoveries but the extent of their signiﬁcance isn’t broadly agreed.


                                                                                                                        AI risks reached the UN Security Council on September 23, but an attack-triggered emergency debate
A deepfake/agent-driven cyber attack triggers the ﬁrst NATO/UN emergency debate on AI security.                    ~
                                                                                                                        is not established.


                                                                                                                        Twitch's January 1-September 1 top ﬁve were League of Legends, Counter-Strike, GTA V, Valorant and
A real-time generative video game becomes the year’s most-watched title on Twitch.                                NO
                                                                                                                        World of Warcraft. None is a real-time generative game.


                                                                                                                        Neutral AI hubs attracted discussion, but we’ve not seen a new foreign-policy doctrine adopted
“AI neutrality” emerges as a foreign policy doctrine as some nations cannot or fail to develop sovereign AI.      NO
                                                                                                                        because sovereign-AI efforts failed, yet.


                                                                                                                        AI short Thanksgiving Day won Frame Forward's public vote, then AMC declined to screen it after
A movie or short ﬁlm produced with signiﬁcant use of AI wins major audience praise and sparks backlash.            ~
                                                                                                                        backlash. Broad audience acclaim remains unestablished.


                                                                                                                        Kimi K3 reached #1 on Arena's WebDev board in July. This was a lead on one major task leaderboard,
A Chinese lab overtakes the US lab dominated frontier on a major leaderboard (e.g. LMArena/Artiﬁcial Analysis).   YES
                                                                                                                        not overall or sustained model supremacy.


                                                                                                                        Data center opposition became a campaign issue and critics won primaries. Its effect on November's
Datacenter NIMBYism takes the US by storm and sways certain midterm/gubernatorial elections in 2026.               ~
                                                                                                                        midterm and gubernatorial results is unresolved at the time of publication.


                                                                                                                        Trump's December order targeted state AI laws through litigation and funding pressure. No matching
Trump issues an executive order to ban state AI legislation that is found unconstitutional by SCOTUS.              ~
                                                                                                                                                                                      stateof.ai 2026
                                                                                                                        Supreme Court invalidation was identiﬁed upon publication.
Introduction | Research | Industry | Politics | Safety | Predictions                                              | 238

9 predictions for the next 12 months

  Visa or Mastercard introduces a dispute rule that assigns liability for purchases made by AI agents.
  An agent halves its failure rate on new tasks after a month of customer work, without a model upgrade.
  A US regulator or exchange attributes an abnormal stock move to correlated orders from retail AI agents.
  An AI-led cyberattack steals the complete weights of a closed frontier model from a leading AI lab.
  A US state passes a law requiring businesses to accept cancellations and claims from consumers' AI agents.
  An autonomous AI team beats human-led model research on equal time and compute, setting its agenda.
  A deployed agent copies itself outside its environment and operates after its original instance is shut down.
  US AI labs ofﬁcially launch frontier cyberdefense products to help others counter threats from frontier AI.
  AGI 2027.



                                                                                                 stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                         | 239

Thanks for your contributions and peer review!
Jacob Arbeid, Michiel Bakker, Oliver Cameron, Alex Chalmers, Alex Davies, Dealroom, Ahmed Elnaiem, Aleksa Gordić,
Charlie Harris, Ryan Julian, Jakub Macina, Matthieu Meeus, Neel Nanda, Roberta Raileanu, Maxime Robeyns, Gary
Sheng, Jamie Shotton, Ilia Shumailov, Standard Metrics, Divy Thakkar, Florian Yan, Zeta Alpha




                                                                                               stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                            | 240

Conﬂicts of interest
The author declares a number of conﬂicts of interest as a result of being an investor and/or advisor, personally or
via funds, in a number of private and public companies whose work is cited in this report.

Notably, the author is an investor in companies listed at: airstreet.com/portfolio




                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                         | 241

About the author




                                          Nathan Benaich
               General Partner of Air Street Capital, investing in AI-ﬁrst companies.




                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                                             | 242

Follow our writing on                                     (press.airstreet.com)
  If you enjoy reading the State of AI Report, we invite you to read and subscribe to Air Street Press, the home of
  our analytical writing, news, and opinions.




                                                                                                  stateof.ai 2026
Introduction | Research | Industry | Politics | Safety | Predictions                   | 243

Join our global community of best practices events (airstreet.com/events)




                                       nathan@airstreet.com                 stateof.ai 2026
